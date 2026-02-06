package matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.List;
import java.util.UUID;

public record CreateSectorRequest(

        @NotBlank(message = "Nome não pode estar vazio")
        @Size(min = 3, max = 50)
        @Pattern(
                regexp = "^[\\p{L} ]+$",
                message = "Nome deve conter apenas letras e espaços"
        )
        String name,

        @Size(max = 200)
        @Pattern(
                regexp = "^[\\p{L} ]+$",
                message = "Descrição deve conter apenas letras e espaços"
        )
        String description,

        @NotNull(message = "Armazenamento não pode estar vazio")
        @Size(min = 1, message = "Deve ter pelo menos um tipo de armazenamento")
        List<StorageType> storages,

        @NotNull(message = "Responsável deve ser informado")
        UUID responsibleId
) {}
