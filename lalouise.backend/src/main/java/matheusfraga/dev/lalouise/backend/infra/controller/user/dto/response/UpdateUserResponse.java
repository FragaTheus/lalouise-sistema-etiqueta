package matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UpdateUserResponse(
        UUID id,
        String nickname,
        String email,
        String message
) {

}