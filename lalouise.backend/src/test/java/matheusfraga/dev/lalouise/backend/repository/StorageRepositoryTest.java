package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.core.domain.repository.StorageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class StorageRepositoryTest {

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Sector sectorA;

    @BeforeEach
    void setUp() {
        sectorA = new Sector("cozinha");
        entityManager.persist(sectorA);

        Sector sectorB = new Sector("cozinha");
        sectorB.setName("Depósito");
        entityManager.persist(sectorB);

        entityManager.persist(new Storage("Freezer Vertical", StorageType.AMBIENTE, sectorA));
        entityManager.persist(new Storage("Geladeira Bebidas", StorageType.CONGELADO, sectorA));
        entityManager.persist(new Storage("Estante Grãos", StorageType.REFRIGERADO, sectorA));

        entityManager.flush();
    }

    @Test
    @DisplayName("Deve retornar todos os registros quando todos os filtros forem nulos")
    void shouldReturnAllWhenFiltersAreNull() {
        List<Storage> result = storageRepository.findByFilters(null, null, null);
        assertThat(result).hasSize(3);
    }

    @Test
    @DisplayName("Deve filtrar apenas por parte do nome (ignore case)")
    void shouldFilterByName() {
        List<Storage> result = storageRepository.findByFilters("FREEZER", null, null);
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getName()).isEqualTo("Freezer Vertical");
    }

    @Test
    @DisplayName("Deve filtrar por tipo e setor simultaneamente")
    void shouldFilterByTypeAndSector() {

        UUID targetSectorId = sectorA.getId();

        entityManager.flush();
        entityManager.clear();

        List<Storage> result = storageRepository.findByFilters(null, StorageType.REFRIGERADO, targetSectorId);

        assertThat(result).hasSize(1);
    }

    @Test
    @DisplayName("Deve retornar lista vazia quando nenhum registro corresponder")
    void shouldReturnEmptyListWhenNoMatches() {
        List<Storage> result = storageRepository.findByFilters("NomeInexistente", StorageType.CONGELADO, UUID.randomUUID());
        assertThat(result).isEmpty();
    }
}