package matheusfraga.dev.lalouise.backend.infra.in.controller.product;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ProductSummary(UUID id, String name) {
}
