package matheusfraga.dev.lalouise.backend.core.domain.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException() {
        super("Produto nao encontrado");
    }
}
