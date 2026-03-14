package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelCommand;
import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelOverOldLabelCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;

import java.util.UUID;


public record LabelMapper() {

    public static LabelSummary toLabelSummary(Label label){
        return LabelSummary.builder()
                .id(label.getId())
                .lote(label.getLote())
                .product(label.getProduct().getName())
                .sector(label.getSector().getName())
                .status(label.getStatus())
                .build();
    }

    public static LabelInfo toLabelInfo(Label label){
        return LabelInfo.builder()
                .product(label.getProduct().getName())
                .sector(label.getSector().getName())
                .responsible(label.getResponsible().getNickname())
                .lote(label.getLote())
                .issueDate(label.getIssueDate())
                .expirationDate(label.getExpirationDate())
                .status(label.getStatus())
                .build();
    }

    public static LabelReprintResponse toLabelReprintResponse(Label label){
        return LabelReprintResponse.builder()
                .id(label.getId())
                .lote(label.getLote())
                .productId(label.getProduct().getId())
                .productName(label.getProduct().getName())
                .expirationDate(label.getExpirationDate())
                .build();

    }

    public static CreateLabelCommand toCreateLabelCommand(CreateLabelRequest request){
        return CreateLabelCommand.builder()
                .productId(request.productId())
                .sectorId(request.sectorId())
                .storageType(request.storageType())
                .copies(request.copies())
                .build();
    }

    public static CreateLabelOverOldLabelCommand toCreateLabelOverOldLabelCommand(
            UUID oldLabelId,
            CreateLabelOverOldLabelRequest request
    ){
        return CreateLabelOverOldLabelCommand.builder()
                .oldLabelId(oldLabelId)
                .sectorId(request.sectorId())
                .storageType(request.storageType())
                .copies(request.copies())
                .build();
    }

}
