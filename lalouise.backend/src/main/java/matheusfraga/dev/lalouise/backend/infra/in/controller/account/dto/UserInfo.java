package matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto;

import lombok.Builder;

@Builder
public record UserInfo(String nickname, String email, String role) {
}
