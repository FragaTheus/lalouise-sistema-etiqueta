package matheusfraga.dev.lalouise.backend.core.domain.exception.storage;

public class SameStorageNameException extends RuntimeException {
    public SameStorageNameException() {
        super("O nome do armazenamento deve ser diferente do antigo.");
    }
}
