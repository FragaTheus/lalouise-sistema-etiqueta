package matheusfraga.dev.lalouise.backend.infra.controller.user;

import matheusfraga.dev.lalouise.backend.core.domain.entity.User;

public record CreateUserResponse(
        String nickname,
        String email,
        String role,
        String message
) {
    public static CreateUserResponse of(User user) {
        return new CreateUserResponse(
                user.getNickname().value(),
                user.getEmail().value(),
                user.getRole().toString(),
                "Usuário criado com sucesso!"
        );
    }
}
