package matheusfraga.dev.lalouise.backend.core.aplication;

public record LoginRequest(
        String email,
        String password
) {
}
