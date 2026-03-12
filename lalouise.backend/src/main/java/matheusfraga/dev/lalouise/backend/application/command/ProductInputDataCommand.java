package matheusfraga.dev.lalouise.backend.application.command;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ProductInputDataCommand(UUID id, String name, String description) {
}
