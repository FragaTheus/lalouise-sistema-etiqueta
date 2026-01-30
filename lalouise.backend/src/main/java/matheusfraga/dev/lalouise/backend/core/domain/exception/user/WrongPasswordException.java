package matheusfraga.dev.lalouise.backend.core.domain.exception.user;

public class WrongPasswordException extends RuntimeException {
    public WrongPasswordException() {
        super("Senha incorreta, corrija e tente novamente.");
    }
}
