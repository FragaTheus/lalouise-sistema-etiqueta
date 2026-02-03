package matheusfraga.dev.lalouise.backend.application.command;


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
