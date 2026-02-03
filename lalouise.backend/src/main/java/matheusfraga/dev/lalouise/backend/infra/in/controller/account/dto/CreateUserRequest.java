package matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CreateUserRequest(

        @NotBlank(message = "Nome nao pode estar vazio.")
        @Pattern(
                regexp = "^[\\p{L}\\s]{3,20}$",
                message = "Formato de nome invalido. Nome nao pode ter numeros e nem caracteres especiais"
        )
        String nickname,

        @NotBlank(message = "Email nao pode estar vazio.")
        @Pattern(
                regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                message = "Formato de email invalido, tente novamente."
        )
        String email,

        @NotBlank(message = "Senha nao pode estar vazia")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message = "Senha deve ter entre 08 e 12 caracteres, uma letra maiúscula, uma minúscula, um numero e um caractere especial"
        )
        String password,

        @NotBlank(message = "Confirmação de senha nao pode estar vazia")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$",
                message =
                        "Confirmação deve ter entre 08 e 12 caracteres, uma letra maiúscula, uma minúscula, um numero e um caractere especial"
        )
        String confirmPassword

) {
}
