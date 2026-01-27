package matheusfraga.dev.lalouise.backend.core.aplication;

import java.util.UUID;

public record UpdateUserInputCommand(
        UUID id,
        String nickname,
        String password,
        String confirmPassword
) {
}
