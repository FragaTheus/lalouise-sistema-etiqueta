package matheusfraga.dev.lalouise.backend.core.domain.exception;

public class PasswordDontMatchException extends RuntimeException {
    public PasswordDontMatchException() {
        super("Senha e confirmação estão diferentes, tente novamente.");
    }
}
