package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelInputCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;

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

}
