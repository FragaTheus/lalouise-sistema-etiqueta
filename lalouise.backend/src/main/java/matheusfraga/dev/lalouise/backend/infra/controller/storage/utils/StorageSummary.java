package matheusfraga.dev.lalouise.backend.infra.controller.storage.utils;

import lombok.Builder;

import java.util.UUID;

@Builder
public record StorageSummary(UUID id, String name) {
}
