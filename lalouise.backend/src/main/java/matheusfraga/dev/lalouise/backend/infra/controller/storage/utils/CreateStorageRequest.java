package matheusfraga.dev.lalouise.backend.infra.controller.storage.utils;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;

public record CreateStorageRequest(

        @NotBlank
        @Size(min = 5, max = 50)
        @Pattern(
            regexp = "^[a-zA-Z]+$",
                message = "Formato de nome invalido."
        )
        String name,
        StorageType type
){
}
