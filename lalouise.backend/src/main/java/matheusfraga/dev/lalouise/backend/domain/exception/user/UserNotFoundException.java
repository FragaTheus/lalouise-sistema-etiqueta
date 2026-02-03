package matheusfraga.dev.lalouise.backend.domain.exception.user;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("Usuário nao encontrado, tente novamente.");
    }
}
