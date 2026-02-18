package matheusfraga.dev.lalouise.backend.infra.in.controller.auth;

import matheusfraga.dev.lalouise.backend.domain.enums.Role;

import java.util.UUID;

public record LoginResponse(
        UUID id,
        String nickname,
        Role role
) {
}
