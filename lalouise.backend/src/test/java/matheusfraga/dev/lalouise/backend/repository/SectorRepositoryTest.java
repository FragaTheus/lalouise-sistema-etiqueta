package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.repository.SectorRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class SectorRepositoryTest {

    private static final String HASHED_PASSWORD = "$2a$12$R9h/lIPz0bouIzCu6slgOKS7LeBnMh9Gj31I/yI.8vH7/P.T8/L5.";

    @Autowired
    private SectorRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    @DisplayName("Deve buscar todos os tipos de armazenamento de um setor")
    void shouldFindAllStoragesBySectorId() {
        var responsible = new Account("Nick", "res@test.com", HASHED_PASSWORD, Role.USER);
        entityManager.persist(responsible);

        var storages = List.of(StorageType.AMBIENTE, StorageType.REFRIGERADO);
        var sector = new Sector("Setor A", "Desc", responsible, storages);
        var savedSector = entityManager.persist(sector);

        var result = repository.findAllStoragesBySectorId(savedSector.getId());

        assertThat(result).hasSize(2).contains(StorageType.AMBIENTE, StorageType.REFRIGERADO);
    }

    @Test
    @DisplayName("Deve verificar se responsável já possui um setor")
    void shouldCheckIfResponsibleExists() {
        var responsible = new Account("Nick", "res@test.com", HASHED_PASSWORD, Role.USER);
        entityManager.persist(responsible);

        var sector = new Sector("Setor A", "Desc", responsible, List.of(StorageType.HIPER_CONGELADO));
        entityManager.persist(sector);

        boolean exists = repository.existsByResponsible(responsible);

        assertThat(exists).isTrue();
    }
}
