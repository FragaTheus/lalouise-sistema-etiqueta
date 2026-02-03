package matheusfraga.dev.lalouise.backend.infra.controller.account;

import lombok.Builder;

@Builder
public record UserInfo(String nickname, String email, String role) {
}
