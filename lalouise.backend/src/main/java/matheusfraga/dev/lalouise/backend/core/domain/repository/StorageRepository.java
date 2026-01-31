package matheusfraga.dev.lalouise.backend.core.domain.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StorageRepository extends JpaRepository<Storage, UUID> {

    List<Storage> findAllBySectorId(UUID sectorId);

}
