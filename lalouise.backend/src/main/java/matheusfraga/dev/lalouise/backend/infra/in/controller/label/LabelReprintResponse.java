package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

@Builder
public record LabelReprintResponse(
        UUID id,
        String lote,
        UUID productId,
        String productName,
        LocalDate expirationDate
) {
}
