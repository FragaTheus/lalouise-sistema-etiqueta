package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelCommand;
import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelOverOldLabelCommand;
import matheusfraga.dev.lalouise.backend.application.service.*;
import matheusfraga.dev.lalouise.backend.domain.entity.*;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.repository.LabelLotSequenceRepository;
import matheusfraga.dev.lalouise.backend.domain.repository.LabelRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LabelServiceTest {

    @Mock
    private LabelRepository labelRepository;
    @Mock
    private LabelLotSequenceRepository labelLotSequenceRepository;
    @Mock
    private ProductService productService;
    @Mock
    private SectorService sectorService;
    @Mock
    private ValidityService validityService;
    @Mock
    private PrintJobService printJobService;
    @Mock
    private ZplService zplService;

    @InjectMocks
    private LabelService labelService;

    @Test
    @DisplayName("Deve gerar lote sequencial ao criar nova etiqueta")
    void shouldGenerateSequentialLoteWhenCreatingNewLabel() {
        UUID productId = UUID.randomUUID();
        UUID sectorId = UUID.randomUUID();
        Account responsible = mock(Account.class);
        Sector sector = mock(Sector.class);
        Product product = mock(Product.class);
        LabelLotSequence sequence = mock(LabelLotSequence.class);
        LocalDate expirationDate = LocalDate.now().plusDays(3);

        when(sectorService.getSector(sectorId)).thenReturn(sector);
        when(sector.getResponsible()).thenReturn(responsible);
        when(sector.getStorages()).thenReturn(List.of(StorageType.REFRIGERADO));
        when(productService.getProduct(productId)).thenReturn(product);
        when(validityService.calculateExpirationDate(eq(StorageType.REFRIGERADO), any(LocalDate.class))).thenReturn(expirationDate);
        when(validityService.determineStatus(expirationDate)).thenReturn(LabelStatus.A_VENCER);
        when(labelLotSequenceRepository.saveAndFlush(any(LabelLotSequence.class))).thenReturn(sequence);
        when(sequence.getId()).thenReturn(1L);
        when(labelRepository.save(any(Label.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(zplService.generate(any(Label.class))).thenReturn("^XA^XZ");

        Label created = labelService.createLabel(CreateLabelCommand.builder()
                .productId(productId)
                .sectorId(sectorId)
                .storageType(StorageType.REFRIGERADO)
                .copies(2)
                .build());

        assertEquals("L000001", created.getLote());

        ArgumentCaptor<Label> labelCaptor = ArgumentCaptor.forClass(Label.class);
        verify(labelRepository).save(labelCaptor.capture());
        assertEquals("L000001", labelCaptor.getValue().getLote());
        verify(printJobService).queue("^XA^XZ", 2);
    }

    @Test
    @DisplayName("Deve manter o mesmo lote no reprint")
    void shouldKeepSameLoteOnReprint() {
        UUID productId = UUID.randomUUID();
        UUID oldLabelId = UUID.randomUUID();
        UUID sectorId = UUID.randomUUID();
        Account responsible = mock(Account.class);
        Sector sector = mock(Sector.class);
        Product oldProduct = mock(Product.class);
        Product product = mock(Product.class);
        Label oldLabel = mock(Label.class);
        LocalDate expirationDate = LocalDate.now().plusDays(1);

        when(sectorService.getSector(sectorId)).thenReturn(sector);
        when(sector.getResponsible()).thenReturn(responsible);
        when(sector.getStorages()).thenReturn(List.of(StorageType.AMBIENTE));
        when(productService.getProduct(productId)).thenReturn(product);
        when(validityService.calculateExpirationDate(eq(StorageType.AMBIENTE), any(LocalDate.class))).thenReturn(expirationDate);
        when(validityService.determineStatus(expirationDate)).thenReturn(LabelStatus.A_VENCER);
        when(labelRepository.findById(oldLabelId)).thenReturn(Optional.of(oldLabel));
        when(oldLabel.getStatus()).thenReturn(LabelStatus.ATIVA);
        when(oldLabel.getProduct()).thenReturn(oldProduct);
        when(oldProduct.getId()).thenReturn(productId);
        when(oldLabel.getLote()).thenReturn("L000321");
        when(labelRepository.save(any(Label.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(zplService.generate(any(Label.class))).thenReturn("^XA^XZ");

        Label created = labelService.createLabelOverOldLabel(CreateLabelOverOldLabelCommand.builder()
                .oldLabelId(oldLabelId)
                .sectorId(sectorId)
                .storageType(StorageType.AMBIENTE)
                .copies(1)
                .build());

        assertEquals("L000321", created.getLote());
        verify(oldLabel).setStatus(LabelStatus.DESCARTADA);
        verify(labelLotSequenceRepository, never()).saveAndFlush(any(LabelLotSequence.class));
    }
}

