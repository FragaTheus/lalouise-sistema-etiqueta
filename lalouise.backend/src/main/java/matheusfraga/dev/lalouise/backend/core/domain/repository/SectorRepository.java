package matheusfraga.dev.lalouise.backend.core.domain.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SectorRepository extends JpaRepository<Sector, UUID>{
}
