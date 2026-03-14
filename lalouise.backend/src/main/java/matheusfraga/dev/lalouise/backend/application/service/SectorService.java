package matheusfraga.dev.lalouise.backend.application.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.command.sector.CreateSectorCommand;
import matheusfraga.dev.lalouise.backend.application.command.sector.UpdateSectorInputCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.exception.sector.*;
import matheusfraga.dev.lalouise.backend.domain.exception.user.NoDataForUpdateException;
import matheusfraga.dev.lalouise.backend.domain.repository.SectorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository repository;
    private final AccountService accountService;

    // Casos de uso
    public Sector getSector(UUID id) {
        return repository.findById(id)
                .orElseThrow(SectorNotFoundException::new);
    }

    public Page<Sector> getAllSectors(String search, Pageable pageable) {
        return repository.findAllByFilter(search, pageable);
    }

    public Page<Sector> getDeletedSectors(String search, Pageable pageable) {
        return repository.findAllDeletedByFilter(search, pageable);
    }

    @Transactional
    public void createSector(CreateSectorCommand command) {
        validateSectorNameUnique(command.name());

        Account responsible = accountService.getUserById(command.responsibleId());

        Sector sector = new Sector(
                command.name(),
                command.description(),
                responsible,
                command.storages()
        );

        repository.save(sector);
    }

    @Transactional
    public void updateSector(UpdateSectorInputCommand command) {

        if (hasNoUpdates(command)) {
            throw new NoDataForUpdateException();
        }

        Sector sector = getSector(command.id());

        updateNameIfChanged(sector, command.name());
        updateDescriptionIfPresent(sector, command.description());
        updateStoragesIfPresent(sector, command.storages());
        updateResponsibleIfChanged(sector, command.responsibleId());
    }

    @Transactional
    public void deactivateSector(UUID id) {
        Sector sector = getSector(id);
        sector.deactivate();
        repository.save(sector);
    }

    @Transactional
    public void reactivateSector(UUID id) {
        Sector sector = getSector(id);
        sector.reactivate();
        repository.save(sector);
    }

    public List<StorageType> getStoragesFromAuthenticatedUser(UUID sectorId) {
        return repository.findAllStoragesBySectorId(sectorId);
    }

    public Account getResponsibleBySectorId(UUID sectorId) {
        return getSector(sectorId).getResponsible();
    }


    // Métodos auxiliares
    private boolean hasNoUpdates(UpdateSectorInputCommand command) {
        return isBlank(command.name())
                && isBlank(command.description())
                && isEmpty(command.storages())
                && command.responsibleId() == null;
    }

    private void updateNameIfChanged(Sector sector, String newName) {
        if (isBlank(newName)) {
            return;
        }

        if (!newName.equalsIgnoreCase(sector.getName())) {
            validateSectorNameUnique(newName);
            sector.setName(newName);
        }
    }

    private void updateDescriptionIfPresent(Sector sector, String newDescription) {
        if (!isBlank(newDescription)) {
            sector.setDescription(newDescription);
        }
    }

    private void updateStoragesIfPresent(Sector sector, List<StorageType> newStorages) {
        if (!isEmpty(newStorages)) {
            sector.setStorages(newStorages);
        }
    }

    private void updateResponsibleIfChanged(Sector sector, UUID newResponsibleId) {
        if (newResponsibleId == null) {
            return;
        }

        if (!newResponsibleId.equals(sector.getResponsible().getId())) {
            Account newResponsible = accountService.getUserById(newResponsibleId);
            sector.setResponsible(newResponsible);
        }
    }

    private void validateSectorNameUnique(String name) {
        if (repository.existsByNameIgnoreCase(name)) {
            throw new SectorAlreadyExistsException();
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private boolean isEmpty(List<?> list) {
        return list == null || list.isEmpty();
    }
}