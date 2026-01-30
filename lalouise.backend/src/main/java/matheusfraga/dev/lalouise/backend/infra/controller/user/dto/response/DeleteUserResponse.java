package matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response;

import lombok.Builder;

@Builder
public record DeleteUserResponse(String message, String nickname, String email) {
}
