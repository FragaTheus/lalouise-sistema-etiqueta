package matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DeleteUserRequest
        (
                @NotBlank
                @Pattern(
                        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                        message =
                                "Confirmacao deve ter entre 08 e 12 caracteres, uma letra maiúscula, uma minúscula, um numero e um caractere especial"
                )
                String password
        )
{
}
