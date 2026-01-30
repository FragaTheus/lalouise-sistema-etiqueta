package matheusfraga.dev.lalouise.backend.core.application.user.command;

import lombok.Builder;

@Builder
public record CreateUserInputCommand(
        String nickname,
        String email,
        String password,
        String confirmPassword
) {
}
