package matheusfraga.dev.lalouise.backend.core.application.storage;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.application.sector.SectorService;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import matheusfraga.dev.lalouise.backend.core.domain.exception.storage.SameStorageNameException;
import matheusfraga.dev.lalouise.backend.core.domain.exception.storage.StorageNotFoundException;
import matheusfraga.dev.lalouise.backend.core.domain.repository.StorageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final StorageRepository repository;
    private final SectorService sectorService;

    public Storage createStorage(CreateStorageCommand command) {
        Sector sector = sectorService.getSector(command.sectorId());
        Storage storage = new Storage(command.name(), command.type(), sector);
        return repository.save(storage);
    }

    @Transactional
    public Storage updateStorageName(UUID id, String newName){
        Storage storage = getStorage(id);
        boolean nameIsEqual = storage.getName().equals(newName);
        if(nameIsEqual) throw new SameStorageNameException();
        storage.setName(newName);
        return repository.save(storage);
    }

    public void deleteStorage(UUID id){
        repository.deleteById(id);
    }

    public Storage getStorage(UUID id) {
        return repository.findById(id).orElseThrow(StorageNotFoundException::new);
    }

    public List<Storage> findAllStorage(UUID sectorId){
        return repository.findAllBySectorId(sectorId);
    }
}
