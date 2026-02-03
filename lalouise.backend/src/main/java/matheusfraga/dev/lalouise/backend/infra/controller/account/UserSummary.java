package matheusfraga.dev.lalouise.backend.infra.controller.account;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserSummary(UUID id, String nickname) {
}
