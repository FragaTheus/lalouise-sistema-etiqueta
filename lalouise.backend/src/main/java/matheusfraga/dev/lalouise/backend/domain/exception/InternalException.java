package matheusfraga.dev.lalouise.backend.domain.exception;

public class InternalException extends RuntimeException {
    public InternalException(String message) {
        super(message);
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
