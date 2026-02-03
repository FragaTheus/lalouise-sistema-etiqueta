package matheusfraga.dev.lalouise.backend.infra.in.controller.account;

import matheusfraga.dev.lalouise.backend.application.command.account.AccountFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.application.command.account.CreateAccountCommand;
import matheusfraga.dev.lalouise.backend.application.command.account.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.CreateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UpdateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UserInfo;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UserSummary;

import java.util.UUID;

public record AccountMapper() {

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
