package matheusfraga.dev.lalouise.backend.infra.controller.sector;

import matheusfraga.dev.lalouise.backend.core.application.sector.UpdateSectorInputCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;

import java.util.UUID;

public record SectorMapper() {

    public static SectorInfo toSectorInfo(Sector sector) {
        return SectorInfo.builder()
                .id(sector.getId())
                .name(sector.getName())
                .description(sector.getDescription())
                .build();
    }

    public static UpdateSectorInputCommand toUpdateSectorInputCommand(UUID id, UpdateSectorRequest request) {
        return UpdateSectorInputCommand.builder()
                .id(id)
                .name(request.name())
                .description(request.description())
                .build();
    }

    public static SectorSummary toSectorSummary(Sector sector) {
        return SectorSummary.builder()
                .id(sector.getId())
                .name(sector.getName())
                .build();
    }

}
