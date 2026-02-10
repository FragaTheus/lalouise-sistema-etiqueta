package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.UUID;

public record CreateLabelOverOldLabelRequest(
        @NotBlank
        StorageType storageType,

        @Min(1)
        Integer copies
) {
}
