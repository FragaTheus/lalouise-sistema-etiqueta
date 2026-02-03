package matheusfraga.dev.lalouise.backend.domain.exception.sector;

public class SameResponsibleException extends RuntimeException {
    public SameResponsibleException( ) {
        super("Esse usuário ja esta vinculado a esse setor.");
    }
}
