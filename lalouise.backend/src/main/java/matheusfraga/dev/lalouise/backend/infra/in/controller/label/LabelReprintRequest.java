package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.UUID;

public record LabelReprintRequest(
        UUID responsibleId,
        UUID sectorId,
        StorageType storage
) {
}
