package matheusfraga.dev.lalouise.backend.infra.controller.user;

import matheusfraga.dev.lalouise.backend.core.application.user.command.CreateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UpdateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UserFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.CreateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response.*;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.UpdateUserRequest;

import java.util.UUID;

public record UserMapper() {

    public static CreateUserInputCommand toCreateUserInputCommand(CreateUserRequest request){
        return CreateUserInputCommand.builder()
                .nickname(request.nickname())
                .email(request.email())
                .password(request.password())
                .confirmPassword(request.confirmPassword())
                .build();
    }

    public static UpdateUserInputCommand toUpdateUserInputCommand(UUID id, UpdateUserRequest request){
        return UpdateUserInputCommand.builder()
                .id(id)
                .nickname(request.nickname())
                .password(request.password())
                .confirmPassword(request.confirmPassword())
                .build();
    }

    public static CreateUserResponse toCreateUserResponse(User user) {
        String message = "Usuario criado com sucesso!";
        return CreateUserResponse.builder()
                .nickname(user.getNickname().value())
                .email(user.getEmail().value())
                .role(user.getRole().name())
                .message(message)
                .build();
    }

    public static UpdateUserResponse toUpdateUserResponse(User user) {
        String message =  "Usuario atualizado com sucesso!";
        return UpdateUserResponse.builder()
                .id(user.getId())
                .nickname(user.getNickname().value())
                .email(user.getEmail().value())
                .message(message)
                .build();
    }

    public static DeleteUserResponse toDeleteUserResponse(User user) {
        String message = "Usuário excluído com sucesso!";
        return DeleteUserResponse.builder()
                .nickname(user.getNickname().value())
                .email(user.getEmail().value())
                .message(message)
                .build();
    }

    public static UserInfo toUserInfo(User user) {
        return UserInfo.builder()
                .nickname(user.getNickname().value())
                .email(user.getEmail().value())
                .role(user.getRole().name())
                .build();
    }

    public static UserSummary toUserSummary(User user){
        return UserSummary.builder()
                .id(user.getId())
                .nickname(user.getNickname().value())
                .build();
    }

    public static UserFilterQueryCommand toFilterQueryCommand(String nickname, String email, Role role){
        return UserFilterQueryCommand.builder()
                .nickname(nickname)
                .email(email)
                .role(role)
                .build();
    }

}
