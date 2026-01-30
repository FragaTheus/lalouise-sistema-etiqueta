package matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response;

import lombok.Builder;

@Builder
public record CreateUserResponse(
        String nickname,
        String email,
        String role,
        String message
) {

}
