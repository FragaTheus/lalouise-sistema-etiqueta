package matheusfraga.dev.lalouise.backend.domain.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException() {
        super("Produto nao encontrado");
    }
}
