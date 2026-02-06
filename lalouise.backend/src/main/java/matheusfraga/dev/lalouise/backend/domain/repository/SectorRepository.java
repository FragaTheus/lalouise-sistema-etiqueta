package matheusfraga.dev.lalouise.backend.domain.repository;

import lombok.NonNull;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SectorRepository extends JpaRepository<Sector, UUID>{

    boolean existsByNameIgnoreCase(String name);

    boolean existsById(@NonNull UUID id);

    boolean existsByResponsible(Account responsible);

    @Query("""
        SELECT s FROM Sector s
        WHERE (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%',:name,'%')))
        """)
    List<Sector> findAllByFilter(@Param("name") String name);

    @Query("""
        SELECT s.storages 
        FROM Sector s 
        JOIN s.storages 
        WHERE s.id = :sectorId
        """)
    List<StorageType> findAllStoragesBySectorId(@Param("sectorId") UUID sectorId);

}
