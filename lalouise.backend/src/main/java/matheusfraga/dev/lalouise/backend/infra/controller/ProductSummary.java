package matheusfraga.dev.lalouise.backend.infra.controller;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ProductSummary(UUID id, String name) {
}
