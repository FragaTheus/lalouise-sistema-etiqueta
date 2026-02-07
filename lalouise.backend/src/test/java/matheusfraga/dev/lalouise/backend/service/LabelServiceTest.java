package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelInputCommand;
import matheusfraga.dev.lalouise.backend.application.command.label.LabelReprintCommand;
import matheusfraga.dev.lalouise.backend.application.command.label.PageFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.application.service.*;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.exception.label.LabelNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.exception.sector.StorageTypeNotAllowedInSectorException;
import matheusfraga.dev.lalouise.backend.domain.repository.LabelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("LabelService - Testes Unitários")
class LabelServiceTest {

    @Mock
    private LabelRepository labelRepository;

    @Mock
    private ProductService productService;

    @Mock
    private AccountService accountService;

    @Mock
    private SectorService sectorService;

    @Mock
    private ValidityService validityService;

    @InjectMocks
    private LabelService labelService;

    private UUID productId;
    private UUID sectorId;
    private UUID responsibleId;
    private UUID labelId;
    private Product product;
    private Sector sector;
    private Account responsible;
    private Label label;

    @BeforeEach
    void setUp() {
        productId = UUID.randomUUID();
        sectorId = UUID.randomUUID();
        responsibleId = UUID.randomUUID();
        labelId = UUID.randomUUID();

        product = new Product(productId, "Produto teste");
        responsible = new Account(responsibleId,"Joao", "email@email.com", "password", Role.ADMIN);

        List<StorageType> storages = new ArrayList<>();
        storages.add(StorageType.AMBIENTE);
        storages.add(StorageType.CONGELADO);
        sector = new Sector(sectorId, "Nome do setor", "Setor Teste", responsible, storages);

        var expirationDate = LocalDate.now().plusDays(7);
        var issueDate =  LocalDate.now();
        label = new Label(labelId, product, sector, responsible, issueDate,expirationDate, LabelStatus.ATIVA);
    }

    @Test
    @DisplayName("Deve criar etiqueta com sucesso")
    void shouldCreateLabelSuccessfully() {
        // Arrange
        CreateLabelInputCommand command = CreateLabelInputCommand.builder()
                .productId(productId)
                .responsibleId(responsibleId)
                .sectorId(sectorId)
                .storageType(StorageType.CONGELADO)
                .build();

        LocalDate expirationDate = LocalDate.now().plusDays(30);

        when(productService.getProduct(productId)).thenReturn(product);
        when(sectorService.getSector(sectorId)).thenReturn(sector);
        when(accountService.getUserById(responsibleId)).thenReturn(responsible);
        when(validityService.calculateExpirationDate(StorageType.CONGELADO, LocalDate.now()))
                .thenReturn(expirationDate);
        when(validityService.determineStatus(expirationDate)).thenReturn(LabelStatus.ATIVA);
        when(labelRepository.save(any(Label.class))).thenReturn(label);

        // Act
        Label result = labelService.createLabel(command);

        // Assert
        assertThat(result).isNotNull();
        verify(productService).getProduct(productId);
        verify(sectorService).getSector(sectorId);
        verify(accountService).getUserById(responsibleId);
        verify(validityService).calculateExpirationDate(StorageType.CONGELADO, LocalDate.now());
        verify(validityService).determineStatus(expirationDate);
        verify(labelRepository).save(any(Label.class));
    }



    @Test
    @DisplayName("Deve buscar etiquetas com filtros")
    void shouldFindLabelsByFilters() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10);
        PageFilterQueryCommand command = new PageFilterQueryCommand(
                responsibleId,
                "Produto",
                "João",
                "Setor",
                LabelStatus.ATIVA,
                pageable
        );

        Page<Label> expectedPage = new PageImpl<>(List.of(label));

        when(labelRepository.findByFilters(
                responsibleId,
                "Produto",
                "João",
                "Setor",
                LabelStatus.ATIVA,
                pageable
        )).thenReturn(expectedPage);

        // Act
        Page<Label> result = labelService.findByFilters(command);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().getFirst()).isEqualTo(label);
        verify(labelRepository).findByFilters(
                responsibleId,
                "Produto",
                "João",
                "Setor",
                LabelStatus.ATIVA,
                pageable
        );
    }

    @Test
    @DisplayName("Deve atualizar status da etiqueta antiga")
    void shouldUpdateLabelStatus() {
        UUID targetId = UUID.randomUUID();

        Product mockProduct = mock(Product.class);
        Sector mockSector = mock(Sector.class);
        Account mockAccount = mock(Account.class);


        when(mockSector.getStorages()).thenReturn(List.of(StorageType.AMBIENTE));

        Label oldLabel = new Label(
                targetId,
                mockProduct,
                mockSector,
                mockAccount,
                LocalDate.now(),
                LocalDate.now().plusDays(5),
                LabelStatus.ATIVA
        );

        var command = LabelReprintCommand.builder()
                .oldLabelId(targetId)
                .newResponsibleId(UUID.randomUUID())
                .newSectorId(UUID.randomUUID())
                .newStorage(StorageType.AMBIENTE)
                .build();

        when(labelRepository.findById(targetId)).thenReturn(Optional.of(oldLabel));
        when(productService.getProduct(any())).thenReturn(mockProduct);
        when(sectorService.getSector(any())).thenReturn(mockSector);
        when(accountService.getUserById(any())).thenReturn(mockAccount);
        when(validityService.calculateExpirationDate(any(), any())).thenReturn(LocalDate.now());
        when(labelRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        labelService.updateLabelStatus(command);

        assertThat(oldLabel.getStatus()).isEqualTo(LabelStatus.DESCARTADA);
        verify(labelRepository).findById(targetId);
    }


    @Test
    @DisplayName("Deve buscar etiqueta por ID")
    void shouldGetLabelById() {
        // Arrange
        when(labelRepository.findById(labelId)).thenReturn(Optional.of(label));

        // Act
        Label result = labelService.getLabel(labelId);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(labelId);
        verify(labelRepository).findById(labelId);
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar etiqueta inexistente")
    void shouldThrowExceptionWhenGettingNonExistentLabel() {
        // Arrange
        UUID nonExistentId = UUID.randomUUID();
        when(labelRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> labelService.getLabel(nonExistentId))
                .isInstanceOf(LabelNotFoundException.class);

        verify(labelRepository).findById(nonExistentId);
    }

    @Test
    @DisplayName("Deve verificar e expirar etiquetas vencidas")
    void shouldCheckAndExpireLabels() {
        // Arrange
        LocalDate today = LocalDate.now();
        LocalDate alertDate = today.plusDays(3);
        List<LabelStatus> statusParaVencer = List.of(LabelStatus.ATIVA, LabelStatus.A_VENCER);

        var expirationDate = LocalDate.now().plusDays(3);
        var issueDate  = LocalDate.now();
        Label expiredLabel = new Label(product, sector, responsible, issueDate, expirationDate, LabelStatus.ATIVA);
        expiredLabel.setExpirationDate(today.minusDays(1));

        Label toExpireLabel = new Label(product, sector, responsible, issueDate, expirationDate, LabelStatus.ATIVA);

        when(labelRepository.findAllByExpirationDateLessThanEqualAndStatusIn(today, statusParaVencer))
                .thenReturn(List.of(expiredLabel));
        when(labelRepository.findAllByExpirationDateAndStatus(alertDate, LabelStatus.ATIVA))
                .thenReturn(List.of(toExpireLabel));
        when(labelRepository.saveAll(anyList())).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        labelService.checkAndExpireLabels();

        // Assert
        assertThat(expiredLabel.getStatus()).isEqualTo(LabelStatus.VENCIDA);
        assertThat(toExpireLabel.getStatus()).isEqualTo(LabelStatus.A_VENCER);
        verify(labelRepository).findAllByExpirationDateLessThanEqualAndStatusIn(today, statusParaVencer);
        verify(labelRepository).findAllByExpirationDateAndStatus(alertDate, LabelStatus.ATIVA);
        verify(labelRepository, times(2)).saveAll(anyList());
    }

    @Test
    @DisplayName("Não deve fazer nada quando não há etiquetas para expirar")
    void shouldDoNothingWhenNoLabelsToExpire() {
        // Arrange
        LocalDate today = LocalDate.now();
        LocalDate alertDate = today.plusDays(3);
        List<LabelStatus> statusParaVencer = List.of(LabelStatus.ATIVA, LabelStatus.A_VENCER);

        when(labelRepository.findAllByExpirationDateLessThanEqualAndStatusIn(today, statusParaVencer))
                .thenReturn(List.of());
        when(labelRepository.findAllByExpirationDateAndStatus(alertDate, LabelStatus.ATIVA))
                .thenReturn(List.of());

        // Act
        labelService.checkAndExpireLabels();

        // Assert
        verify(labelRepository).findAllByExpirationDateLessThanEqualAndStatusIn(today, statusParaVencer);
        verify(labelRepository).findAllByExpirationDateAndStatus(alertDate, LabelStatus.ATIVA);
        verify(labelRepository, never()).saveAll(anyList());
    }

    @Test
    @DisplayName("Deve limpar etiquetas antigas")
    void shouldCleanOldLabels() {
        // Arrange
        LocalDate limitDate = LocalDate.now().minusDays(90);
        List<LabelStatus> statusParaLimpar = List.of(LabelStatus.VENCIDA, LabelStatus.DESCARTADA);
        int deletedCount = 5;

        when(labelRepository.deleteOldLabelsByStatusIn(statusParaLimpar, limitDate))
                .thenReturn(deletedCount);

        // Act
        labelService.cleanOldLabels();

        // Assert
        verify(labelRepository).deleteOldLabelsByStatusIn(statusParaLimpar, limitDate);
    }

    @Test
    @DisplayName("Deve registrar quando nenhuma etiqueta antiga foi removida")
    void shouldLogWhenNoOldLabelsRemoved() {
        // Arrange
        LocalDate limitDate = LocalDate.now().minusDays(90);
        List<LabelStatus> statusParaLimpar = List.of(LabelStatus.VENCIDA, LabelStatus.DESCARTADA);

        when(labelRepository.deleteOldLabelsByStatusIn(statusParaLimpar, limitDate))
                .thenReturn(0);

        // Act
        labelService.cleanOldLabels();

        // Assert
        verify(labelRepository).deleteOldLabelsByStatusIn(statusParaLimpar, limitDate);
    }
}