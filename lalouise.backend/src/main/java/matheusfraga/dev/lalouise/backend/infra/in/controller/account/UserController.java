package matheusfraga.dev.lalouise.backend.infra.in.controller.account;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.service.AccountService;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.PerfilInfo;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UpdateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final AccountService accountService;

    @GetMapping("/me")
    public ResponseEntity<PerfilInfo> getMe(
            @AuthenticationPrincipal UserDetailsImpl principal
    ) {
        var user = accountService.getUserById(principal.getId());
        var response =  AdminMapper.toPerfilInfo(user);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/me")
    public ResponseEntity<Void> update
            (@AuthenticationPrincipal UserDetailsImpl principal, @Valid @RequestBody UpdateUserRequest request){
        var command = AdminMapper.toUpdateUserInputCommand(principal.getId(), request);
        accountService.updateUser(command);
        return ResponseEntity.ok().build();
    }

}
