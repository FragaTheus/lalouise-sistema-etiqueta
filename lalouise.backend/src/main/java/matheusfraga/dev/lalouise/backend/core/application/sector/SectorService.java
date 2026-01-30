package matheusfraga.dev.lalouise.backend.core.application.sector;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.repository.SectorRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository sectorRepository;

    public Sector getSector(UUID id){
        return sectorRepository.findById(id).orElseThrow(RuntimeException::new);
    }

}
