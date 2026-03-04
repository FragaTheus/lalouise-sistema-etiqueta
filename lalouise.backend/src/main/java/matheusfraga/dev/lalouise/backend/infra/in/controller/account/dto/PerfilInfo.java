package matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;

import java.time.LocalDateTime;

@Builder
public record PerfilInfo(
        String nickname,
        String email,
        Role role,
        LocalDateTime createdAt
) {
}
