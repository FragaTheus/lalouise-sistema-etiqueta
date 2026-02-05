package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;

import java.time.LocalDate;

@Builder
public record LabelInfo(
        String product,
        String sector,
        String responsible,
        LocalDate issueDate,
        LocalDate expirationDate,
        LabelStatus status
) {
}
