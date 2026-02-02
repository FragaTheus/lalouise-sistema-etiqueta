package matheusfraga.dev.lalouise.backend.infra.controller.user;

import matheusfraga.dev.lalouise.backend.core.application.user.command.AccountFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.CreateAccountCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.CreateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response.*;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.UpdateUserRequest;

import java.util.UUID;

public record UserMapper() {

    public static CreateAccountCommand toCreateUserInputCommand(CreateUserRequest request){
        return CreateAccountCommand.builder()
                .nickname(request.nickname())
                .email(request.email())
                .password(request.password())
                .confirmPassword(request.confirmPassword())
                .build();
    }

    public static UpdateAccountCommand toUpdateUserInputCommand(UUID id, UpdateUserRequest request){
        return UpdateAccountCommand.builder()
                .id(id)
                .nickname(request.nickname())
                .password(request.password())
                .confirmPassword(request.confirmPassword())
                .build();
    }

    public static CreateUserResponse toCreateUserResponse(Account account) {
        String message = "Usuario criado com sucesso!";
        return CreateUserResponse.builder()
                .nickname(account.getNickname())
                .email(account.getEmail())
                .role(account.getRole().name())
                .message(message)
                .build();
    }

    public static UpdateUserResponse toUpdateUserResponse(Account account) {
        String message =  "Usuario atualizado com sucesso!";
        return UpdateUserResponse.builder()
                .id(account.getId())
                .nickname(account.getNickname())
                .email(account.getEmail())
                .message(message)
                .build();
    }

    public static DeleteUserResponse toDeleteUserResponse(Account account) {
        String message = "Usuário excluído com sucesso!";
        return DeleteUserResponse.builder()
                .nickname(account.getNickname())
                .email(account.getEmail())
                .message(message)
                .build();
    }

    public static UserInfo toUserInfo(Account account) {
        return UserInfo.builder()
                .nickname(account.getNickname())
                .email(account.getEmail())
                .role(account.getRole().name())
                .build();
    }

    public static UserSummary toUserSummary(Account acount){
        return UserSummary.builder()
                .id(acount.getId())
                .nickname(acount.getNickname())
                .build();
    }

    public static AccountFilterQueryCommand toFilterQueryCommand(String nickname, String email, Role role){
        return AccountFilterQueryCommand.builder()
                .nickname(nickname)
                .email(email)
                .role(role)
                .build();
    }

}
