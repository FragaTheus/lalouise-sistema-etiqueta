package matheusfraga.dev.lalouise.backend.core.application.sector;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UpdateSectorInputCommand(UUID id, String name, String description) {
}
