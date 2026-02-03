package matheusfraga.dev.lalouise.backend.infra.in.controller.account;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.service.AccountService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.CreateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UpdateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UserInfo;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UserSummary;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @PostMapping
    public ResponseEntity<Void> createUser(@Valid @RequestBody CreateUserRequest request){
        var command = AccountMapper.toCreateUserInputCommand(request);
        service.createUser(command);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/admins")
    public ResponseEntity<Void> createAdmin(@Valid @RequestBody CreateUserRequest request){
        var command = AccountMapper.toCreateUserInputCommand(request);
        service.createAdmin(command);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update
            (@PathVariable UUID id, @Valid @RequestBody UpdateUserRequest request){
        var command = AccountMapper.toUpdateUserInputCommand(id, request);
        service.updateUser(command);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete
            (@PathVariable UUID id){
            service.deleteUser(id);
            return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> getUser(@PathVariable UUID id){
        var user = service.getUserById(id);
        var response = AccountMapper.toUserInfo(user);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<List<UserSummary>> getAllUsers(
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Role role
    ) {
        var command = AccountMapper.toFilterQueryCommand(nickname, email, role);
        List<Account> accounts = service.getAllUsers(command);
        List<UserSummary> response = accounts.stream()
                .map(AccountMapper::toUserSummary)
                .toList();

        return ResponseEntity.ok(response);
    }
}
