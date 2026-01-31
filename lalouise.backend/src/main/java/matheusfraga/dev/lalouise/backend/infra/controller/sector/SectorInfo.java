package matheusfraga.dev.lalouise.backend.infra.controller.sector;

import lombok.Builder;

import java.util.UUID;

@Builder
public record SectorInfo(UUID id, String name, String description) {
}
