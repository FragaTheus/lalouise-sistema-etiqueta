package matheusfraga.dev.lalouise.backend.core.application.storage;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;

import java.util.UUID;

@Builder
public record StorageQueryFilterCommand(String name, StorageType type, UUID sectorId) {
}
