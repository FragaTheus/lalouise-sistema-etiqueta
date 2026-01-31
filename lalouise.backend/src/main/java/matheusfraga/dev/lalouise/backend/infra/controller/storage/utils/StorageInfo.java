package matheusfraga.dev.lalouise.backend.infra.controller.storage.utils;

import lombok.Builder;

import java.util.UUID;

@Builder
public record StorageInfo(UUID id, String name, String type, String sectorName) {
}
