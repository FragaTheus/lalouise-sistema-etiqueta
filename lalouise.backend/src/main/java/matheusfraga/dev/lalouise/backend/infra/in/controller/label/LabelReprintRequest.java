package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.UUID;

public record LabelReprintRequest(
        StorageType storage
) {
}
