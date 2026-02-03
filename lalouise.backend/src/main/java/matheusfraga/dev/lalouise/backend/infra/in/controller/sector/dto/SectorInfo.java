package matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record SectorInfo(UUID id, String name, String description, String responsibleName) {
}
