package matheusfraga.dev.lalouise.backend.core.application.user.command;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;

@Builder
public record AccountFilterQueryCommand(String nickname, String email, Role role) {
}
