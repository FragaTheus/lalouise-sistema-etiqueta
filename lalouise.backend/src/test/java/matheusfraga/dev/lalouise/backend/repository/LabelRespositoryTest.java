package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.repository.LabelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@DisplayName("LabelRepository - Testes de Integração")
class LabelRepositoryTest {

    @Autowired
    private LabelRepository labelRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Product product1;
    private Product product2;
    private Sector sector1;
    private Sector sector2;
    private Account responsible1;
    private Account responsible2;

    @BeforeEach
    void setUp() {
        // Criar produtos
        product1 = new Product(null, "Arroz");
        product1 = entityManager.persistAndFlush(product1);

        product2 = new Product(null, "Feijão");
        product2 = entityManager.persistAndFlush(product2);

        // Criar responsáveis
        responsible1 = new Account(null, "Maria", "maria@email.com", "password", Role.ADMIN);
        responsible1 = entityManager.persistAndFlush(responsible1);

        responsible2 = new Account(null, "João", "joao@email.com", "password", Role.ADMIN);
        responsible2 = entityManager.persistAndFlush(responsible2);

        // Criar setores
        List<StorageType> storages1 = new ArrayList<>();
        storages1.add(StorageType.AMBIENTE);
        storages1.add(StorageType.CONGELADO);
        sector1 = new Sector(null, "Cozinha", "Setor da cozinha", responsible1, storages1);
        sector1 = entityManager.persistAndFlush(sector1);

        List<StorageType> storages2 = new ArrayList<>();
        storages2.add(StorageType.AMBIENTE);
        sector2 = new Sector(null, "Despensa", "Setor da despensa", responsible2, storages2);
        sector2 = entityManager.persistAndFlush(sector2);
    }

    @Test
    @DisplayName("Deve buscar etiquetas por ID do responsável")
    void shouldFindLabelsByResponsibleId() {
        // Arrange
        Label label = createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        createLabel(product2, sector2, responsible2, LabelStatus.ATIVA);

        Pageable pageable = PageRequest.of(0, 10);

        // Act
        Page<Label> result = labelRepository.findByFilters(
                responsible1.getId(), null, null, null, null, pageable
        );

        // Assert
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getId()).isEqualTo(label.getId());
        assertThat(result.getContent().get(0).getResponsible().getId()).isEqualTo(responsible1.getId());
    }

    @Test
    @DisplayName("Deve buscar etiquetas por nome do produto (case insensitive)")
    void shouldFindLabelsByProductNameCaseInsensitive() {
        // Arrange
        createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        createLabel(product2, sector2, responsible1, LabelStatus.ATIVA);

        Pageable pageable = PageRequest.of(0, 10);

        // Act
        Page<Label> result = labelRepository.findByFilters(
                null, "arr", null, null, null, pageable
        );

        // Assert
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getProduct().getName()).isEqualTo("Arroz");
    }

    @Test
    @DisplayName("Deve buscar etiquetas por nome do responsável (partial match)")
    void shouldFindLabelsByResponsibleNamePartialMatch() {
        // Arrange
        createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        createLabel(product2, sector2, responsible2, LabelStatus.ATIVA);

        Pageable pageable = PageRequest.of(0, 10);

        // Act
        Page<Label> result = labelRepository.findByFilters(
                null, null, "mar", null, null, pageable
        );

        // Assert
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getResponsible().getNickname()).isEqualTo("Maria");
    }

    @Test
    @DisplayName("Deve buscar etiquetas por nome do setor")
    void shouldFindLabelsBySectorName() {
        // Arrange
        createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        createLabel(product2, sector2, responsible1, LabelStatus.ATIVA);

        Pageable pageable = PageRequest.of(0, 10);

        // Act
        Page<Label> result = labelRepository.findByFilters(
                null, null, null, "coz", null, pageable
        );

        // Assert
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getSector().getName()).isEqualTo("Cozinha");
    }

    @Test
    @DisplayName("Deve buscar etiquetas por status")
    void shouldFindLabelsByStatus() {
        // Arrange
        createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        createLabel(product2, sector2, responsible1, LabelStatus.VENCIDA);

        Pageable pageable = PageRequest.of(0, 10);

        // Act
        Page<Label> result = labelRepository.findByFilters(
                null, null, null, null, LabelStatus.VENCIDA, pageable
        );

        // Assert
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().getFirst().getStatus()).isEqualTo(LabelStatus.VENCIDA);
    }

    @Test
    @DisplayName("Deve buscar etiquetas com múltiplos filtros combinados")
    void shouldFindLabelsWithMultipleFilters() {
        // Arrange
        createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        createLabel(product1, sector2, responsible1, LabelStatus.VENCIDA);
        createLabel(product2, sector1, responsible2, LabelStatus.ATIVA);

        Pageable pageable = PageRequest.of(0, 10);

        // Act
        Page<Label> result = labelRepository.findByFilters(
                responsible1.getId(), "arroz", null, "cozinha", LabelStatus.ATIVA, pageable
        );

        // Assert
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().getFirst().getProduct().getName()).isEqualTo("Arroz");
        assertThat(result.getContent().getFirst().getSector().getName()).isEqualTo("Cozinha");
        assertThat(result.getContent().getFirst().getResponsible().getId()).isEqualTo(responsible1.getId());
    }

    @Test
    @DisplayName("Deve retornar todas as etiquetas quando nenhum filtro é aplicado")
    void shouldReturnAllLabelsWhenNoFiltersApplied() {
        // Arrange
        createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        createLabel(product2, sector2, responsible2, LabelStatus.VENCIDA);

        Pageable pageable = PageRequest.of(0, 10);

        // Act
        Page<Label> result = labelRepository.findByFilters(
                null, null, null, null, null, pageable
        );

        // Assert
        assertThat(result.getContent()).hasSize(2);
    }

    @Test
    @DisplayName("Deve buscar etiquetas por data de validade exata e status")
    void shouldFindLabelsByExpirationDateAndStatus() {
        // Arrange
        LocalDate targetDate = LocalDate.now().plusDays(3);
        Label label1 = createLabelWithExpiration(product1, sector1, responsible1, targetDate, LabelStatus.ATIVA);
        createLabelWithExpiration(product2, sector2, responsible2, targetDate.plusDays(1), LabelStatus.ATIVA);

        // Act
        List<Label> result = labelRepository.findAllByExpirationDateAndStatus(targetDate, LabelStatus.ATIVA);

        // Assert
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getId()).isEqualTo(label1.getId());
    }

    @Test
    @DisplayName("Deve buscar etiquetas com data de validade menor ou igual e status específico")
    void shouldFindLabelsByExpirationDateLessThanEqualAndStatusIn() {
        // Arrange
        LocalDate today = LocalDate.now();
        createLabelWithExpiration(product1, sector1, responsible1, today.minusDays(1), LabelStatus.ATIVA);
        createLabelWithExpiration(product2, sector2, responsible2, today, LabelStatus.A_VENCER);
        createLabelWithExpiration(product1, sector1, responsible1, today.plusDays(1), LabelStatus.ATIVA);

        List<LabelStatus> statuses = List.of(LabelStatus.ATIVA, LabelStatus.A_VENCER);

        // Act
        List<Label> result = labelRepository.findAllByExpirationDateLessThanEqualAndStatusIn(today, statuses);

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result).allMatch(l -> l.getExpirationDate().isBefore(today.plusDays(1)));
    }

    @Test
    @DisplayName("Deve deletar etiquetas antigas por status")
    void shouldDeleteOldLabelsByStatusIn() {
        LocalDate oldDate = LocalDate.now().minusDays(100);
        LocalDate limitDate = LocalDate.now().minusDays(90);

        Label oldLabel1 = createLabel(product1, sector1, responsible1, LabelStatus.VENCIDA);
        oldLabel1.setIssueDate(oldDate);

        Label oldLabel2 = createLabel(product2, sector2, responsible2, LabelStatus.DESCARTADA);
        oldLabel2.setIssueDate(oldDate);

        Label recentLabel = createLabel(product1, sector1, responsible1, LabelStatus.VENCIDA);

        entityManager.persist(oldLabel1);
        entityManager.persist(oldLabel2);
        entityManager.persist(recentLabel);
        entityManager.flush();
        entityManager.clear();

        List<LabelStatus> statusesToDelete = List.of(LabelStatus.VENCIDA, LabelStatus.DESCARTADA);
        int deletedCount = labelRepository.deleteOldLabelsByStatusIn(statusesToDelete, limitDate);

        assertThat(deletedCount).isEqualTo(2);
        assertThat(labelRepository.findById(oldLabel1.getId())).isEmpty();
        assertThat(labelRepository.findById(oldLabel2.getId())).isEmpty();
        assertThat(labelRepository.findById(recentLabel.getId())).isPresent();
    }

    @Test
    @DisplayName("Não deve deletar etiquetas quando nenhuma corresponde aos critérios")
    void shouldNotDeleteWhenNoCriteriaMatch() {
        LocalDate recentDate = LocalDate.now().minusDays(10);
        createLabelWithIssueDate(product1, sector1, responsible1, recentDate, LabelStatus.ATIVA);

        entityManager.flush();

        LocalDate limitDate = LocalDate.now().minusDays(90);
        List<LabelStatus> statusesToDelete = List.of(LabelStatus.VENCIDA, LabelStatus.DESCARTADA);

        int deletedCount = labelRepository.deleteOldLabelsByStatusIn(statusesToDelete, limitDate);

        assertThat(deletedCount).isZero();
    }

    @Test
    @DisplayName("Deve respeitar paginação na busca por filtros")
    void shouldRespectPaginationInFilteredSearch() {

        for (int i = 0; i < 15; i++) {
            createLabel(product1, sector1, responsible1, LabelStatus.ATIVA);
        }

        Pageable firstPage = PageRequest.of(0, 10);
        Pageable secondPage = PageRequest.of(1, 10);

        Page<Label> page1 = labelRepository.findByFilters(null, null, null, null, null, firstPage);
        Page<Label> page2 = labelRepository.findByFilters(null, null, null, null, null, secondPage);

        assertThat(page1.getContent()).hasSize(10);
        assertThat(page2.getContent()).hasSize(5);
        assertThat(page1.getTotalElements()).isEqualTo(15);
        assertThat(page2.getTotalElements()).isEqualTo(15);
    }

    private Label createLabel(Product product, Sector sector, Account responsible, LabelStatus status) {
        LocalDate expirationDate = LocalDate.now().plusDays(7);
        LocalDate issueDate = LocalDate.now();
        Label label = new Label(product, sector, responsible, issueDate,expirationDate, status);
        return entityManager.persistAndFlush(label);
    }

    private Label createLabelWithExpiration(Product product, Sector sector, Account responsible,
                                            LocalDate expirationDate, LabelStatus status) {
        LocalDate issueDate = LocalDate.now();

        Label label = new Label(product, sector, responsible, issueDate,expirationDate, status);
        return entityManager.persistAndFlush(label);
    }

    private Label createLabelWithIssueDate(Product product, Sector sector, Account responsible,
                                           LocalDate issueDate, LabelStatus status) {
        LocalDate date = LocalDate.now();
        LocalDate expirationDate = issueDate.plusDays(7);
        Label label = new Label(product, sector, responsible, date, expirationDate, status);
        return entityManager.persistAndFlush(label);
    }
}
