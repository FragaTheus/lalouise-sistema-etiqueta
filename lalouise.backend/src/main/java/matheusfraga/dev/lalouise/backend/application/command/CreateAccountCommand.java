package matheusfraga.dev.lalouise.backend.application.command;

import lombok.Builder;

@Builder
public record CreateAccountCommand(
        String nickname,
        String email,
        String password,
        String confirmPassword
) {

}
