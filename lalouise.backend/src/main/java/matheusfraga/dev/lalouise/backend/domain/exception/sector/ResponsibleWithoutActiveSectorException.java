package matheusfraga.dev.lalouise.backend.domain.exception.sector;

public class ResponsibleWithoutActiveSectorException extends RuntimeException {
    public ResponsibleWithoutActiveSectorException() {
        super("Usuario autenticado nao possui setor ativo responsavel.");
    }
}

