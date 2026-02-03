package matheusfraga.dev.lalouise.backend.domain.exception.product;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException() {
        super("Produto nao encontrado");
    }
}
