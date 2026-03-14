package matheusfraga.dev.lalouise.backend.infra.in.controller.account;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.service.AccountService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<Void> createUser(@Valid @RequestBody CreateUserRequest request){
        var command = AdminMapper.toCreateUserInputCommand(request);
        accountService.createUser(command);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/create-admins")
    public ResponseEntity<Void> createAdmin(@Valid @RequestBody CreateUserRequest request){
        var command = AdminMapper.toCreateUserInputCommand(request);
        accountService.createAdmin(command);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update
            (@PathVariable UUID id, @Valid @RequestBody UpdateUserRequest request){
        var command = AdminMapper.toUpdateUserInputCommand(id, request);
        accountService.updateUser(command);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete
            (@PathVariable UUID id){
            accountService.deactivateAccount(id);
            return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> getUser(@PathVariable UUID id){
        var user = accountService.getUserById(id);
        var response = AdminMapper.toUserInfo(user);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<Page<UserSummary>> getAllUsers(
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Role role,
            @PageableDefault(size = 20, page = 0, sort = "id", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        var command = AdminMapper.toFilterQueryCommand(nickname, email, role, pageable);
        Page<Account> accounts = accountService.getAllUsers(command);
        Page<UserSummary> response = accounts.map(AdminMapper::toUserSummary);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/deleted")
    public ResponseEntity<Page<UserSummary>> getDeletedUsers(
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Role role,
            @PageableDefault(size = 20, page = 0, sort = "id", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        var command = AdminMapper.toFilterQueryCommand(nickname, email, role, pageable);
        Page<Account> accounts = accountService.getDeletedAccountsByFilter(command);
        Page<UserSummary> response = accounts.map(AdminMapper::toUserSummary);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/restore")
    public ResponseEntity<Void> restoreUser(@PathVariable UUID id) {
        accountService.reactivateAccount(id);
        return ResponseEntity.ok().build();
    }

}
