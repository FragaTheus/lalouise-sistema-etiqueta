package matheusfraga.dev.lalouise.backend.core.aplication;

public record CreateUserInputCommand(
        String nickname,
        String email,
        String password,
        String confirmPassword
) {
}
