package matheusfraga.dev.lalouise.backend.core.application.sector;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.exception.sector.SectorAlreadyExistsException;
import matheusfraga.dev.lalouise.backend.core.domain.repository.SectorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository sectorRepository;

    public Sector getSector(UUID id){
        return sectorRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public Sector createSector(String name, String description){
        boolean exists = sectorRepository.existsByNameValueIgnoreCase(name);
        if(exists) throw new SectorAlreadyExistsException();
        Sector sector = new Sector(name, description);
        return sectorRepository.save(sector);
    }

    @Transactional
    public Sector updateSector(UpdateSectorInputCommand command){
        Sector sector = getSector(command.id());

        if(command.description() != null && !command.description().isBlank()){
            sector.setDescription(command.description());
        }

        if(command.name() != null && !command.name().isBlank()){
            if(!command.name().equals(sector.getName())){
                if(sectorRepository.existsByNameValueIgnoreCase(command.name())){
                    throw new SectorAlreadyExistsException();
                }
                sector.setName(command.name());
            }
        }

        return sectorRepository.save(sector);
    }

    public void deleteSector(UUID id){
        sectorRepository.deleteById(id);
    }

    public List<Sector> getAllSectors(String name){
        return sectorRepository.findAllByFilter(name);
    }

}
