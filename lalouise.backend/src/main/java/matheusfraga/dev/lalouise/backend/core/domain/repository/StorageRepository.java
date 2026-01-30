package matheusfraga.dev.lalouise.backend.core.domain.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StorageRepository extends JpaRepository<Storage, UUID> {

    @Query("""
   SELECT s FROM Storage s 
   WHERE (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))) 
   AND (:type IS NULL OR s.type = :type)
   AND (:sectorId IS NULL OR s.sector.id = :sectorId)
""")
    List<Storage> findByFilters(
            @Param("name") String name,
            @Param("type") StorageType type,
            @Param("sectorId") UUID sectorId
    );

}
