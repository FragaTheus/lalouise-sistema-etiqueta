package matheusfraga.dev.lalouise.backend.infra.in.controller.sector;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.service.SectorService;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.CreateSectorRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.SectorInfo;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.SectorSummary;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.UpdateSectorRequest;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/sectors")
@RequiredArgsConstructor
public class SectorController {

    private final SectorService service;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<SectorInfo> getSectorInfo(@PathVariable UUID id) {
        var sector = service.getSector(id);
        var response = SectorMapper.toSectorInfo(sector);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody CreateSectorRequest request) {
        var command = SectorMapper.toCreateSectorCommand(request);
        service.createSector(command);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSectorRequest request) {
        var command = SectorMapper.toUpdateSectorInputCommand(id, request);
        service.updateSector(command);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.deactivateSector(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<SectorSummary>> getAllSectors(
            @RequestParam(name = "search", required = false) String search,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        var page = service.getAllSectors(search, pageable);
        var summaries = page.map(SectorMapper::toSectorSummary);
        return ResponseEntity.ok(summaries);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/deleted")
    public ResponseEntity<Page<SectorSummary>> getDeletedSectors(
            @RequestParam(name = "search", required = false) String search,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        var page = service.getDeletedSectors(search, pageable);
        var summaries = page.map(SectorMapper::toSectorSummary);
        return ResponseEntity.ok(summaries);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/restore")
    public ResponseEntity<Void> restore(@PathVariable UUID id) {
        service.reactivateSector(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{sectorId}/storages")
    public ResponseEntity<List<StorageType>> getAllStorages(@PathVariable UUID sectorId) {
        var response = service.getStoragesBySectorId(sectorId);
        return ResponseEntity.ok(response);
    }


}
