package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

public record CreateLabelOverOldLabelRequest(

        @NotNull
        StorageType storageType,

        @Min(1)
        Integer copies
) {
}
