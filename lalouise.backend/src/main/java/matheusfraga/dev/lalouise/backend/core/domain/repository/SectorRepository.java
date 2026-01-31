package matheusfraga.dev.lalouise.backend.core.domain.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SectorRepository extends JpaRepository<Sector, UUID>{

    boolean existsByNameValueIgnoreCase(String name);

    @Query("""
        SELECT s FROM Sector s
        WHERE (:name IS NULL OR LOWER(s.name.value) = LOWER(:name))
        """)
    List<Sector> findAllByFilter(@Param("name") String name);

}
