package matheusfraga.dev.lalouise.backend.domain.exception.sector;

public class SectorNotFoundException extends RuntimeException {
    public SectorNotFoundException() {
        super("Setor nao encontrado.");
    }
}
