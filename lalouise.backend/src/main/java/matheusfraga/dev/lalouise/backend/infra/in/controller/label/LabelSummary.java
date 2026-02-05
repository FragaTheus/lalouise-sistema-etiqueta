package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;

import java.util.UUID;

@Builder
public record LabelSummary(UUID id, String sector, String product, LabelStatus status) {
}
