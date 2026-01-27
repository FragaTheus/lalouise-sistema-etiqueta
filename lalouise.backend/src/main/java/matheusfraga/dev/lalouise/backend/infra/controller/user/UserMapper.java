package matheusfraga.dev.lalouise.backend.infra.controller.user;

import matheusfraga.dev.lalouise.backend.core.aplication.CreateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.aplication.UpdateUserInputCommand;

import java.util.UUID;

public record UserMapper() {

    public static CreateUserInputCommand toCreateUserInputCommand(CreateUserRequest request){
        return new CreateUserInputCommand(request.nickname(), request.email(), request.password(), request.confirmPassword());
    }

    public static UpdateUserInputCommand toUpdateUserInputCommand(UUID id, UpdateUserRequest request){
        return new UpdateUserInputCommand(id, request.password(), request.confirmPassword());
    }

}
