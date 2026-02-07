package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import lombok.Builder;

import java.util.UUID;

@Builder
public record LabelReprintResponse(
        UUID id,
        UUID productId,
        String productName,
        UUID sectorId,
        String sectorName,
        UUID responsibleId,
        String responsibleName
) {
}
