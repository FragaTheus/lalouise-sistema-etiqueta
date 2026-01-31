package matheusfraga.dev.lalouise.backend.infra.controller.sector;

import lombok.Builder;

import java.util.UUID;

@Builder
public record SectorSummary(UUID id, String name) {
}
