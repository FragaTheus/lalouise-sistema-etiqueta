package matheusfraga.dev.lalouise.backend.core.application.user.command;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UpdateAccountCommand(
        UUID id,
        String nickname,
        String password,
        String confirmPassword
) {
}
