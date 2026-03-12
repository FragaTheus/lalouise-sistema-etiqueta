package matheusfraga.dev.lalouise.backend.infra.in.controller.product;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UpdateProductRequest(

        @Size(max = 30, message = "Nome do produto tem que ter no maximo 30 caracteres")
        @Pattern(
                regexp = "^[\\p{L}\\s]+$",
                message = "Nome deve conter apenas letras e espaços"
        )
        String name,

        @Size(max = 200, message = "Descrição do produto nao pode ter mais que 200 caracteres")
        @Pattern(
                regexp = "^[\\p{L}\\s]*$",
                message = "Descrição deve conter apenas letras e espaços"
        )
        String description

) {
}
