package matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserSummary(UUID id, String nickname) {
}
