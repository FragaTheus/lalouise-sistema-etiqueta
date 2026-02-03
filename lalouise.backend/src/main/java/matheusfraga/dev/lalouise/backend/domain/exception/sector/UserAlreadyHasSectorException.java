package matheusfraga.dev.lalouise.backend.domain.exception.sector;

public class UserAlreadyHasSectorException extends RuntimeException {
    public UserAlreadyHasSectorException( ) {
        super("Usuário ja esta vinculado a um setor.");
    }
}
