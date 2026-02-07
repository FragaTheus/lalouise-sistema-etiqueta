package matheusfraga.dev.lalouise.backend.domain.exception.label;

public class LabelAlreadyDiscardedException extends RuntimeException {
    public LabelAlreadyDiscardedException() {
        super("Etiqueta ja descartada anteriormente.");
    }
}
