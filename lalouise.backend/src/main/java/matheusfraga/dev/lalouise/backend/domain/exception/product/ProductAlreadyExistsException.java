package matheusfraga.dev.lalouise.backend.domain.exception.product;

public class ProductAlreadyExistsException extends RuntimeException {
    public ProductAlreadyExistsException() {
        super("Produto ja cadastrado na base de dados.");
    }
}
