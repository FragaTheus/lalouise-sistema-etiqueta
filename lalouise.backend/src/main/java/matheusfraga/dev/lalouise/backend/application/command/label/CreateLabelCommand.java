package matheusfraga.dev.lalouise.backend.application.command.label;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.UUID;

@Builder
public record CreateLabelCommand(
        UUID productId,
        StorageType storageType,
        Integer copies
) {
}
