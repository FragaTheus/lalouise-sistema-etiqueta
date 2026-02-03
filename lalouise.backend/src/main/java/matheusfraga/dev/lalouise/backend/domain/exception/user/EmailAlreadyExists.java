package matheusfraga.dev.lalouise.backend.domain.exception.user;

public class EmailAlreadyExists extends RuntimeException {
    public EmailAlreadyExists() {
        super("Email ja cadastrado na base de dados.");
    }
}
