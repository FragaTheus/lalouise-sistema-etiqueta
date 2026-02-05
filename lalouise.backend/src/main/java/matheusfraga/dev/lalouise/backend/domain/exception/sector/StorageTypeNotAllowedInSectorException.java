package matheusfraga.dev.lalouise.backend.domain.exception.sector;

public class StorageTypeNotAllowedInSectorException extends RuntimeException {
    public StorageTypeNotAllowedInSectorException( ) {
        super("Armazenamento nao cadastrado nesse setor.");
    }
}
