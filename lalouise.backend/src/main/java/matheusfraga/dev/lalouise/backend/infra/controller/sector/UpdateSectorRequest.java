package matheusfraga.dev.lalouise.backend.infra.controller.sector;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateSectorRequest(

        @Size(max = 50)
        @Pattern(
                regexp = "^[a-zA-Z0-9]+$",
                message = "Formato de nome invalido."
        )
        String name,

        @Size(max = 200)
        @Pattern(
                regexp = "^[a-zA-ZÀ-ÿ\\s]+$",
                message = "Descrição nao pode ter caracteres especiais nem números"
        )
        String description

) {
}
