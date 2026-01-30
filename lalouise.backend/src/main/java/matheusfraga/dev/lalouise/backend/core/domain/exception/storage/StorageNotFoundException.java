package matheusfraga.dev.lalouise.backend.core.domain.exception.storage;

public class StorageNotFoundException extends RuntimeException {
    public StorageNotFoundException() {
        super("Armazenamento nao encontrado.");
    }
}
