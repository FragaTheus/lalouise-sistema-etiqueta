package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelInputCommand;
import matheusfraga.dev.lalouise.backend.application.command.label.LabelReprintCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;

import java.util.UUID;

public record LabelMapper() {

    public static CreateLabelInputCommand toCreateLabelInputCommand(CreateLabelRequest request) {
        return CreateLabelInputCommand.builder()
                .productId(request.productId())
                .responsibleId(request.responsibleId())
                .sectorId(request.sectorId())
                .storageType(request.storageType())
                .build();
    }

    public static LabelSummary toLabelSummary(Label label){
        return LabelSummary.builder()
                .id(label.getId())
                .product(label.getProduct().getName())
                .sector(label.getSector().getName())
                .build();
    }

    public static LabelInfo toLabelInfo(Label label){
        return LabelInfo.builder()
                .product(label.getProduct().getName())
                .sector(label.getSector().getName())
                .responsible(label.getResponsible().getNickname())
                .issueDate(label.getIssueDate())
                .expirationDate(label.getExpirationDate())
                .status(label.getStatus())
                .build();
    }

    public static LabelReprintResponse toLabelReprintResponse(Label label){
        return LabelReprintResponse.builder()
                .id(label.getId())
                .productId(label.getProduct().getId())
                .productName(label.getProduct().getName())
                .sectorId(label.getSector().getId())
                .sectorName(label.getSector().getName())
                .responsibleId(label.getResponsible().getId())
                .responsibleName(label.getResponsible().getNickname())
                .build();

    }

    public static LabelReprintCommand toLabelReprintCommand(UUID oldLabelId, LabelReprintRequest request){
        return LabelReprintCommand.builder()
                .oldLabelId(oldLabelId)
                .newResponsibleId(request.responsibleId())
                .newSectorId(request.sectorId())
                .newStorage(request.storage())
                .build();
    }

}
