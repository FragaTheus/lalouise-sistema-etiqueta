package matheusfraga.dev.lalouise.backend.infra.controller.storage.utils;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateStorageNameRequest(
        @NotBlank
        @Size(min = 5, max = 50)
        @Pattern(
                regexp = "^[a-zA-Z]+$",
                message = "Formato de nome invalido."
        )
        String name
){
}
