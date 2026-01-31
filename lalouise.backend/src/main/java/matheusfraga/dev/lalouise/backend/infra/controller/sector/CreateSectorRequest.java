package matheusfraga.dev.lalouise.backend.infra.controller.sector;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateSectorRequest(

        @NotBlank
        @Size(min = 5, max = 50)
        @Pattern(
                regexp = "^[a-zA-Z0-9]+$",
                message = "Formato de nome invalido."
        )
        String name,

        @Size(min = 0, max = 200)
        @Pattern(
                regexp = "^[a-zA-ZÀ-ÿ\\s]+$",
                message = "Descrição nao pode ter caracteres especiais nem números"
        )
        String description
) {
}
