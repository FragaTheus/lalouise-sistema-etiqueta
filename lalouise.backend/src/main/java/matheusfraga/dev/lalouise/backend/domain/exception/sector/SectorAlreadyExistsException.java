package matheusfraga.dev.lalouise.backend.domain.exception.sector;

public class SectorAlreadyExistsException extends RuntimeException {
    public SectorAlreadyExistsException() {
        super("Setor ja existe nesse restaurante.");
    }
}
