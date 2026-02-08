package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.time.LocalDate;
import java.util.UUID;

@Builder
public record LabelReprintResponse(
        UUID id,
        UUID productId,
        String productName,
        LocalDate expirationDate
) {
}
