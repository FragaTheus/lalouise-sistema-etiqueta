package matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserInfo(
        String nickname,
        String email,
        String role,
        boolean status,
        LocalDateTime createAt,
        LocalDateTime updateAt,
        LocalDateTime lastLogin
) {
}
