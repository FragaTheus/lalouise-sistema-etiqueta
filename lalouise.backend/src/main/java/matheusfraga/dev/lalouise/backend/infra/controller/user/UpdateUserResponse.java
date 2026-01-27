package matheusfraga.dev.lalouise.backend.infra.controller.user;

import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import java.util.UUID;

public record UpdateUserResponse(
        UUID id,
        String nickname,
        String email,
        String message
) {
    public static UpdateUserResponse of(User user) {
        return new UpdateUserResponse(
                user.getId(),
                user.getNickname().value(),
                user.getEmail().value(),
                "Cadastro atualizado com sucesso!"
        );
    }
}