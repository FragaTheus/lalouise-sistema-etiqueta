package matheusfraga.dev.lalouise.backend.infra.in.controller.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record CreateProductRequest(

        @NotBlank(message = "Nome do produto nao pode ser vazio")
        @Size(min = 5, max = 30, message = "Nome do produto tem que ter entre 05 e 30 caracteres")
        @Pattern(
                regexp = "^[\\p{L}\\s]+$",
                message = "Nome deve conter apenas letras e espaços"
        )
        String name,

        @NotBlank(message = "Descrição do produto nao pode ser vazia")
        @Size(max = 200, message = "Descrição do produto nao pode ter mais que 200 caracteres")
        @Pattern(
                regexp = "^[\\p{L}\\s]*$",
                message = "Descrição deve conter apenas letras e espaços"
        )
        String description

) {
}

