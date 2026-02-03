package matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserSummary(UUID id, String nickname) {
}
