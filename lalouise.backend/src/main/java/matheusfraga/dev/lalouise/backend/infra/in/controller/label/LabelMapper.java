package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import matheusfraga.dev.lalouise.backend.domain.entity.Label;


public record LabelMapper() {

    public static LabelSummary toLabelSummary(Label label){
        return LabelSummary.builder()
                .id(label.getId())
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
                .expirationDate(label.getExpirationDate())
                .build();

    }

}
