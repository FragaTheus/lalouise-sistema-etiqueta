package matheusfraga.dev.lalouise.backend.domain.exception.product;

public class SameProductNameException extends RuntimeException {
    public SameProductNameException() {
        super("Nome do produto nao pode ser igual ao anterior.");
    }
}
