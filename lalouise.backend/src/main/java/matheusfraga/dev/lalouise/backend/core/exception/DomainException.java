package matheusfraga.dev.lalouise.backend.core.exception;

public class DomainException extends RuntimeException {
    public DomainException(String message) {
        super(message);
    }

    @Override
    public synchronized  Throwable fillInStackTrace() {
        return this;
    }
}
