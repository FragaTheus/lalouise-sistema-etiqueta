package matheusfraga.dev.lalouise.backend.infra.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record ProductRequest(

        @NotBlank(message = "Nome do produto nao pode ser vazio")
        @Size(min = 5, max = 30, message = "Nome do produto tem que ter entre 05 e 30 caracteres")
        @Pattern(
                regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$",
                message = "Nome do produto invalido. Nome nao pode ter letras nem caracteres especiais."
        )
        String name
) {
}
