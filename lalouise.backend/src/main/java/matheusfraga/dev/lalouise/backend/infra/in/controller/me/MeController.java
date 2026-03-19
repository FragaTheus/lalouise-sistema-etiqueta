package matheusfraga.dev.lalouise.backend.infra.in.controller.me;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.command.account.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.application.service.AccountService;
import matheusfraga.dev.lalouise.backend.application.service.SectorService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.AdminMapper;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.PerfilInfo;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UpdateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/me")
public class MeController {

    private final AccountService accountService;
    private final SectorService sectorService;

    @GetMapping
    public ResponseEntity<PerfilInfo> getMe(
            @AuthenticationPrincipal UserDetailsImpl principal
    ) {
        Account user = accountService.getUserById(principal.getId());
        PerfilInfo response =  AdminMapper.toPerfilInfo(user);
        return ResponseEntity.ok(response);
    }

    @PatchMapping
    public ResponseEntity<Void> update
            (@AuthenticationPrincipal UserDetailsImpl principal, @Valid @RequestBody UpdateUserRequest request){
        UpdateAccountCommand command = AdminMapper.toUpdateUserInputCommand(principal.getId(), request);
        accountService.updateUser(command);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/storages")
    public ResponseEntity<List<StorageType>> getMyStorages(@AuthenticationPrincipal UserDetailsImpl principal) {
        UUID userId = principal.getId();
        Sector sector = sectorService.getSectorByResponsibleId(userId);
        List<StorageType> storages = sectorService.getStoragesBySectorId(sector.getId());
        return ResponseEntity.ok(storages);
    }

}
