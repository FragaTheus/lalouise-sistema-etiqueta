package matheusfraga.dev.lalouise.backend.domain.exception.label;

public class LabelNotFoundException extends RuntimeException {
    public LabelNotFoundException( ) {
        super("Etiqueta nao encontrada.");
    }
}
