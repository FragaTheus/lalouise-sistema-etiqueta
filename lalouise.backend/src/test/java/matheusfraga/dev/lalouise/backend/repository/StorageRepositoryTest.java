package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.core.domain.repository.StorageRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class StorageRepositoryTest {

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    @DisplayName("Deve retornar todos os storages vinculados a um setor específico")
    void shouldFindAllBySectorId() {

        Sector cozinha = new Sector("Cozinha", "Desc");
        Sector deposito = new Sector("Depósito", "Desc");
        entityManager.persist(cozinha);
        entityManager.persist(deposito);

        Storage s1 = new Storage("Freezer", StorageType.CONGELADO, cozinha);
        Storage s2 = new Storage("Prateleira", StorageType.AMBIENTE, cozinha);
        Storage s3 = new Storage("Estante", StorageType.AMBIENTE, deposito);

        entityManager.persist(s1);
        entityManager.persist(s2);
        entityManager.persist(s3);
        entityManager.flush();

        List<Storage> result = storageRepository.findAllBySectorId(cozinha.getId());

        assertThat(result).hasSize(2);
        assertThat(result).extracting(Storage::getName)
                .containsExactlyInAnyOrder("Freezer", "Prateleira");

        assertThat(result).allMatch(s -> s.getSector().getId().equals(cozinha.getId()));
    }

    @Test
    @DisplayName("Deve retornar lista vazia quando o setor não possui storages")
    void shouldReturnEmptyListWhenSectorHasNoStorages() {

        Sector setorVazio = new Sector("Vazio", "Desc");
        entityManager.persist(setorVazio);
        entityManager.flush();

        List<Storage> result = storageRepository.findAllBySectorId(setorVazio.getId());

        assertThat(result).isEmpty();
    }
}
