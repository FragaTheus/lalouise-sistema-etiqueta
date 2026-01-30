package matheusfraga.dev.lalouise.backend.core.domain.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("Usuário nao encontrado, tente novamente.");
    }
}
