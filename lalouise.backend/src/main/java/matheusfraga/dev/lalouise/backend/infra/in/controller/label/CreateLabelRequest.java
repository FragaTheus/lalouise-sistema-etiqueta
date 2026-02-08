package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.UUID;

@Builder
public record CreateLabelRequest(
        UUID productId,
        StorageType storageType
) {
}
