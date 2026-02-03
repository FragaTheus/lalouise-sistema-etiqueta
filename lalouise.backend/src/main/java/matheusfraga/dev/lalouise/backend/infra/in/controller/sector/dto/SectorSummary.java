package matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record SectorSummary(UUID id, String name) {
}
