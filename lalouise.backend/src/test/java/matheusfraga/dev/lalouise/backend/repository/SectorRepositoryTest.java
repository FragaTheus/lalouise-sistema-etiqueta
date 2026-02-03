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

    @Autowired
    private SectorRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    @DisplayName("Deve buscar todos os tipos de armazenamento de um setor")
    void shouldFindAllStoragesBySectorId() {
        // Criar responsável
        var responsible = new Account("Nick", "res@test.com", "123", Role.USER);
        entityManager.persist(responsible);

        // Criar setor com storages
        var storages = List.of(StorageType.AMBIENTE, StorageType.REFRIGERADO);
        var sector = new Sector("Setor A", "Desc", responsible, storages);
        var savedSector = entityManager.persist(sector);

        var result = repository.findAllStoragesBySectorId(savedSector.getId());

        assertThat(result).hasSize(2).contains(StorageType.AMBIENTE, StorageType.REFRIGERADO);
    }

    @Test
    @DisplayName("Deve verificar se responsável já possui um setor")
    void shouldCheckIfResponsibleExists() {
        var responsible = new Account("Nick", "res@test.com", "123", Role.USER);
        entityManager.persist(responsible);

        var sector = new Sector("Setor A", "Desc", responsible, List.of(StorageType.HIPER_CONGELADO));
        entityManager.persist(sector);

        boolean exists = repository.existsByResponsible(responsible);

        assertThat(exists).isTrue();
    }
}
