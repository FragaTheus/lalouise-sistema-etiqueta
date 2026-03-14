package matheusfraga.dev.lalouise.backend.domain.repository;

import matheusfraga.dev.lalouise.backend.domain.entity.LabelLotSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelLotSequenceRepository extends JpaRepository<LabelLotSequence, Long> {
}

