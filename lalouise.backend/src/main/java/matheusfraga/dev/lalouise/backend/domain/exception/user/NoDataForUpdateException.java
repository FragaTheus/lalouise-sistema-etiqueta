package matheusfraga.dev.lalouise.backend.domain.exception.user;

public class NoDataForUpdateException extends RuntimeException {
    public NoDataForUpdateException() {
        super("Para atualizar o cadastro, deve ser informado, pelo menos, um campo.");
    }
}
