package matheusfraga.dev.lalouise.backend.infra.controller.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.application.user.UserService;
import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.CreateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response.CreateUserResponse;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.DeleteUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.UpdateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response.UpdateUserResponse;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response.UserInfo;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response.UserSummary;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public ResponseEntity<CreateUserResponse> createUser(@Valid @RequestBody CreateUserRequest request){
        var command = UserMapper.toCreateUserInputCommand(request);
        var user = service.createUser(command);
        var response = UserMapper.toCreateUserResponse(user);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/admins")
    public ResponseEntity<CreateUserResponse> createAdmin(@Valid @RequestBody CreateUserRequest request){
        var command = UserMapper.toCreateUserInputCommand(request);
        var user = service.createAdmin(command);
        var response = UserMapper.toCreateUserResponse(user);
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UpdateUserResponse> update
            (@PathVariable UUID id, @Valid @RequestBody UpdateUserRequest request){
        var command = UserMapper.toUpdateUserInputCommand(id, request);
        var user = service.updateUser(command);
        var response = UserMapper.toUpdateUserResponse(user);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete
            (@PathVariable UUID id, @Valid @RequestBody DeleteUserRequest request){
            service.deleteUser(id, request.password());
            return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> getUser(@PathVariable UUID id){
        var user = service.getUserById(id);
        var response = UserMapper.toUserInfo(user);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<List<UserSummary>> getAllUsers(
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Role role
    ) {
        var command = UserMapper.toFilterQueryCommand(nickname, email, role);
        List<User> users = service.getAllUsers(command);
        List<UserSummary> response = users.stream()
                .map(UserMapper::toUserSummary)
                .toList();

        return ResponseEntity.ok(response);
    }
}
