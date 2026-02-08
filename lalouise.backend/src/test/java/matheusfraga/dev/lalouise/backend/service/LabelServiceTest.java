package matheusfraga.dev.lalouise.backend.application.service;

import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.exception.label.LabelNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.repository.LabelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("LabelService - Testes Unitários")
class LabelServiceTest {

    @Mock private LabelRepository labelRepository;
    @Mock private ProductService productService;
    @Mock private SectorService sectorService;
    @Mock private ValidityService validityService;

    @InjectMocks
    private LabelService labelService;

    private UUID productId;
    private Product product;
    private Sector sector;
    private Account responsible;
    private Label label;

    @BeforeEach
    void setUp() {
        productId = UUID.randomUUID();
        product = new Product(productId, "Produto teste");
        responsible = new Account(UUID.randomUUID(), "Joao", "email@email.com", "password", Role.ADMIN);

        sector = new Sector("Setor Teste", "Desc", responsible, List.of(StorageType.AMBIENTE, StorageType.CONGELADO));

        label = new Label(UUID.randomUUID(), product, sector, responsible, LocalDate.now(), LocalDate.now().plusDays(7), LabelStatus.ATIVA);

        Authentication auth = mock(Authentication.class);
        lenient().when(auth.getPrincipal()).thenReturn(responsible);
        SecurityContext securityContext = mock(SecurityContext.class);
        lenient().when(securityContext.getAuthentication()).thenReturn(auth);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    @DisplayName("Deve criar etiqueta com sucesso")
    void shouldCreateLabelSuccessfully() {
        LocalDate expirationDate = LocalDate.now().plusDays(30);

        when(sectorService.getSectorByResponsible(responsible.getId())).thenReturn(sector);
        when(productService.getProduct(productId)).thenReturn(product);
        when(validityService.calculateExpirationDate(StorageType.CONGELADO, LocalDate.now())).thenReturn(expirationDate);
        when(validityService.determineStatus(expirationDate)).thenReturn(LabelStatus.ATIVA);
        when(labelRepository.save(any(Label.class))).thenReturn(label);

        Label result = labelService.createLabel(productId, StorageType.CONGELADO);

        assertThat(result).isNotNull();
        verify(labelRepository).save(any(Label.class));
    }

    @Test
    @DisplayName("Deve atualizar status e criar nova etiqueta no reprint")
    void shouldUpdateLabelStatusAndCreateNew() {
        UUID oldLabelId = UUID.randomUUID();
        Label oldLabel = new Label(oldLabelId, product, sector, responsible, LocalDate.now(), LocalDate.now().plusDays(5), LabelStatus.ATIVA);

        when(labelRepository.findById(oldLabelId)).thenReturn(Optional.of(oldLabel));
        when(sectorService.getSectorByResponsible(any())).thenReturn(sector);
        when(productService.getProduct(any())).thenReturn(product);
        when(validityService.calculateExpirationDate(any(), any())).thenReturn(LocalDate.now().plusDays(10));
        when(labelRepository.save(any())).thenReturn(label);

        Label result = labelService.updateLabelStatus(oldLabelId, StorageType.AMBIENTE);

        assertThat(oldLabel.getStatus()).isEqualTo(LabelStatus.DESCARTADA);
        assertThat(result).isNotNull();
        verify(labelRepository).findById(oldLabelId);
    }

    @Test
    @DisplayName("Deve buscar etiqueta por ID")
    void shouldGetLabelById() {
        when(labelRepository.findById(any())).thenReturn(Optional.of(label));
        Label result = labelService.getLabel(UUID.randomUUID());
        assertThat(result).isNotNull();
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar etiqueta inexistente")
    void shouldThrowExceptionWhenGettingNonExistentLabel() {
        when(labelRepository.findById(any())).thenReturn(Optional.empty());
        assertThatThrownBy(() -> labelService.getLabel(UUID.randomUUID()))
                .isInstanceOf(LabelNotFoundException.class);
    }

    @Test
    @DisplayName("Deve verificar e expirar etiquetas vencidas")
    void shouldCheckAndExpireLabels() {
        LocalDate today = LocalDate.now();
        when(labelRepository.findAllByExpirationDateLessThanEqualAndStatusIn(any(), any())).thenReturn(List.of(label));
        when(labelRepository.findAllByExpirationDateAndStatus(any(), any())).thenReturn(List.of());

        labelService.checkAndExpireLabels();

        assertThat(label.getStatus()).isEqualTo(LabelStatus.VENCIDA);
        verify(labelRepository).saveAll(anyList());
    }

    @Test
    @DisplayName("Deve limpar etiquetas antigas")
    void shouldCleanOldLabels() {
        when(labelRepository.deleteOldLabelsByStatusIn(any(), any())).thenReturn(5);
        labelService.cleanOldLabels();
        verify(labelRepository).deleteOldLabelsByStatusIn(any(), any());
    }
}