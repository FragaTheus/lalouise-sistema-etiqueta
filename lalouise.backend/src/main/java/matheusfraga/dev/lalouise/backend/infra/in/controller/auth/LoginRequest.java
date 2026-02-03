package matheusfraga.dev.lalouise.backend.infra.in.controller.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginRequest(

        @NotBlank(message = "Email nao pode estar vazio")
        @Email(message = "Formato de email invalido.")
        String email,

        @NotBlank(message = "Senha nao pode estar vazia")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message = "Senha deve ter entre 08 e 12 caracteres, com no mínimo, uma letra maiúscula, uma minúscula, um numero e um caractere especial"
        )
        String password
){
}
