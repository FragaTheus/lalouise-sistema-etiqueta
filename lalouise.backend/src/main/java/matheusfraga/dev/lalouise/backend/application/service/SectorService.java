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

    public List<Sector> getAllSectors(String name) {
        return repository.findAllByFilter(name);
    }

    @Transactional
    public void createSector(CreateSectorCommand command) {
        validateSectorNameUnique(command.name());

        Account responsible = accountService.getUserById(command.responsibleId());
        validateResponsibleAvailable(responsible);

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
    public void deleteSector(UUID id) {
        if (!repository.existsById(id)) {
            throw new SectorNotFoundException();
        }
        repository.deleteById(id);
    }

    public List<StorageType> getStoragesFromAuthenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Account account = (Account) authentication.getPrincipal();
        UUID userId = account.getId();

        Sector sector = repository.findByResponsibleId(userId)
                .orElseThrow(SectorNotFoundException::new);

        return repository.findAllStoragesBySectorId(sector.getId());
    }

    private List<StorageType> getSectorStorages(UUID sectorId) {
        if (!repository.existsById(sectorId)) {
            throw new SectorNotFoundException();
        }

        return repository.findAllStoragesBySectorId(sectorId);
    }

    public Sector getSectorByResponsible(UUID responsibleId) {
        return repository.findByResponsibleId(responsibleId).orElseThrow(SectorNotFoundException::new);
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
            validateResponsibleAvailable(newResponsible);
            sector.setResponsible(newResponsible);
        }
    }

    private void validateSectorNameUnique(String name) {
        if (repository.existsByNameIgnoreCase(name)) {
            throw new SectorAlreadyExistsException();
        }
    }

    private void validateResponsibleAvailable(Account responsible) {
        if (repository.existsByResponsible(responsible)) {
            throw new UserAlreadyHasSectorException();
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private boolean isEmpty(List<?> list) {
        return list == null || list.isEmpty();
    }
}