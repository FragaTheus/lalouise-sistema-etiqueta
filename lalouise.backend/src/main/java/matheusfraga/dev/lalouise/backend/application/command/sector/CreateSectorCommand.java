package matheusfraga.dev.lalouise.backend.application.command.sector;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.List;
import java.util.UUID;

@Builder
public record CreateSectorCommand(String name, String description, List<StorageType> storages, UUID responsibleId) {
}
