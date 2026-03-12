package matheusfraga.dev.lalouise.backend.infra.in.controller.product;

import matheusfraga.dev.lalouise.backend.application.command.ProductInputDataCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;

import java.util.UUID;

public final class ProductMapper {

    private ProductMapper() {}

    public static ProductInfo toProductInfo(Product product) {
        return ProductInfo.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .active(product.isActive())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .deletedAt(product.getDeletedAt())
                .build();
    }

    public static ProductInputDataCommand toCommand(UUID id, UpdateProductRequest request) {
        return ProductInputDataCommand.builder()
                .id(id)
                .name(request.name())
                .description(request.description())
                .build();
    }

}
