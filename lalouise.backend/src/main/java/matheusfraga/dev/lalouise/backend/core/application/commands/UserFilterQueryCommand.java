package matheusfraga.dev.lalouise.backend.core.application.commands;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;

@Builder
public record UserFilterQueryCommand(String nickname, String email, Role role) {
}
