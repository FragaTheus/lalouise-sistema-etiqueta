package matheusfraga.dev.lalouise.backend.domain.exception.print;

public class LabelPrintException extends RuntimeException {
    public LabelPrintException(String message, Exception e) {
        super(message);
    }
}
