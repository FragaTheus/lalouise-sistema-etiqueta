package matheusfraga.dev.lalouise.backend.application.command.auth;

import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;

public record AuthResult(
        String token,
        UserDetailsImpl userDetails
) {
}
