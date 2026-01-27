package matheusfraga.dev.lalouise.backend.infra.controller.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UpdateUserRequest(


        @NotBlank
        @Pattern(
                regexp = "^[\\p{L}\\s]{3,20}$",
                message = "Formato de nome invalido"
        )
        String nickname,

        @NotBlank
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message =
                        "Confirmacao deve ter entre 08 e 12 caracteres, uma letra maiúscula, uma minúscula, um numero e um caractere especial"
        )
        String password,

        @NotBlank
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message =
                        "Confirmacao deve ter entre 08 e 12 caracteres, uma letra maiúscula, uma minúscula, um numero e um caractere especial"
        )
        String confirmPassword
) {
}
