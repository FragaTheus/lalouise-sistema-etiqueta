package matheusfraga.dev.lalouise.backend.infra.controller.storage.utils;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DeleteStorageRequest
        (
        @NotBlank
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message = "Senha deve ter entre 08 e 12 caracteres, com no minimo, uma letra maiuscula, uma minuscula, um numero e um caractere especial"
        )
        String password
        )
{
}
