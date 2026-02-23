package matheusfraga.dev.lalouise.backend.application.command.account;

import lombok.Builder;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import org.springframework.data.domain.Pageable;

@Builder
public record AccountFilterQueryCommand(String nickname, String email, Role role, Pageable pageable) {
}
