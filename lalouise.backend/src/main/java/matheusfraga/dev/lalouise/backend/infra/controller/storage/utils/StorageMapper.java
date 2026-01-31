package matheusfraga.dev.lalouise.backend.infra.controller.storage.utils;

import matheusfraga.dev.lalouise.backend.core.application.storage.CreateStorageCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;

import java.util.UUID;

public record StorageMapper() {

    public static CreateStorageCommand toCreateStorageCommand(UUID sectorId, CreateStorageRequest request) {
        return CreateStorageCommand.builder()
                .sectorId(sectorId)
                .name(request.name())
                .type(request.type())
                .build();
    }

    public static StorageSummary toStorageSummary(Storage storage) {
        return StorageSummary.builder()
                .id(storage.getId())
                .name(storage.getName())
                .build();
    }

    public static StorageInfo toStorageInfo(Storage storage) {
        return StorageInfo.builder().id(storage.getId())
                .name(storage.getName())
                .type(storage.getType().name())
                .sectorName(storage.getSector().getName())
                .build();
    }
}
