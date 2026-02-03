package matheusfraga.dev.lalouise.backend.domain.exception.user;

public class PasswordDontMatchException extends RuntimeException {
    public PasswordDontMatchException() {
        super("Senha e confirmação estão diferentes, tente novamente.");
    }
}
