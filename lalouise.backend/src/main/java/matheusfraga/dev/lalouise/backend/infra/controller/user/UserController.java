package matheusfraga.dev.lalouise.backend.infra.controller.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.aplication.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        var response = CreateUserResponse.of(user);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/admins")
    public ResponseEntity<CreateUserResponse> createAdmin(@Valid @RequestBody CreateUserRequest request){
        var command = UserMapper.toCreateUserInputCommand(request);
        var user = service.createAdmin(command);
        var response = CreateUserResponse.of(user);
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UpdateUserResponse> updateAdmin
            (@PathVariable UUID id, @Valid @RequestBody UpdateUserRequest request){
        var command = UserMapper.toUpdateUserInputCommand(id, request);
        var user = service.updateUser(command);
        var response = UpdateUserResponse.of(user);
        return ResponseEntity.ok().body(response);
    }

}
