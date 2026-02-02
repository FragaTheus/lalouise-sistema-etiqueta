package matheusfraga.dev.lalouise.backend.core.domain.exception;

public class SameProductNameException extends RuntimeException {
    public SameProductNameException() {
        super("Nome do produto nao pode ser igual ao anterior.");
    }
}
