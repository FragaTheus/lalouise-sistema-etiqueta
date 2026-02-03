package matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.List;
import java.util.UUID;

public record UpdateSectorRequest(

        @Size(min = 5, max = 50)
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

        @Size(min = 1, message = "Deve ter pelo menos um tipo de armazenamento")
        List<StorageType> storages,

        UUID responsibleId
) {}
