package matheusfraga.dev.lalouise.backend.infra.in.controller.sector;

import matheusfraga.dev.lalouise.backend.application.command.sector.CreateSectorCommand;
import matheusfraga.dev.lalouise.backend.application.command.sector.UpdateSectorInputCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.CreateSectorRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.SectorInfo;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.SectorSummary;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.UpdateSectorRequest;

import java.util.UUID;

public final class SectorMapper {

    private SectorMapper() {}

    public static SectorInfo toSectorInfo(Sector sector) {
        return SectorInfo.builder()
                .id(sector.getId())
                .name(sector.getName())
                .description(sector.getDescription())
                .responsibleName(sector.getResponsible().getNickname())
                .build();
    }

    public static UpdateSectorInputCommand toUpdateSectorInputCommand(UUID id, UpdateSectorRequest request) {
        return UpdateSectorInputCommand.builder()
                .id(id)
                .name(request.name())
                .storages(request.storages())
                .responsibleId(request.responsibleId())
                .description(request.description())
                .build();
    }

    public static SectorSummary toSectorSummary(Sector sector) {
        return SectorSummary.builder()
                .id(sector.getId())
                .name(sector.getName())
                .build();
    }

    public static CreateSectorCommand toCreateSectorCommand(CreateSectorRequest request) {
        return CreateSectorCommand.builder()
                .name(request.name())
                .description(request.description())
                .storages(request.storages())
                .responsibleId(request.responsibleId())
                .build();
    }

}
