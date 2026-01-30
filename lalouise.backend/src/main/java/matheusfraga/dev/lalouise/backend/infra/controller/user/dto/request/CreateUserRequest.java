package matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreateUserRequest(

        @NotBlank
        @Pattern(
                regexp = "^[\\p{L}\\s]{3,20}$",
                message = "Formato de nome invalido"
        )
        String nickname,

        @NotBlank
        @Pattern(
                regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                message = "Formato de email invalido"
        )
        String email,

        @NotBlank
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message = "Senha deve ter entre 08 e 12 caracteres, uma letra maiúscula, uma minúscula, um numero e um caractere especial"
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
