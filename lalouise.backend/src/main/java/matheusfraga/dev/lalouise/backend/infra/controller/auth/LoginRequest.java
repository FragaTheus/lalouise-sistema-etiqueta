package matheusfraga.dev.lalouise.backend.infra.controller.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginRequest(

        @NotBlank
        @Email
        @Pattern(
                regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                message = "Formato de email invalido"
        )
        String email,

        @NotBlank
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message = "Senha deve ter entre 08 e 12 caracteres, com no minimo, uma letra maiuscula, uma minuscula, um numero e um caractere especial"
        )
        String password
){
}
