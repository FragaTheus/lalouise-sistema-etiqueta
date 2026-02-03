package matheusfraga.dev.lalouise.backend.domain.exception.sector;

public class SameSectorNameException extends RuntimeException {
    public SameSectorNameException( ) {
        super("Nome do setor deve ser diferente do antigo para atualizar.");
    }
}
