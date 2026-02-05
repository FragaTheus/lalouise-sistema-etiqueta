package matheusfraga.dev.lalouise.backend.infra.in.controller.label;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.command.label.PageFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.application.service.LabelService;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/labels")
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody @Valid CreateLabelRequest request) {
        var command = LabelMapper.toCreateLabelInputCommand(request);
        labelService.createLabel(command);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<Page<LabelSummary>> findAll(
            @RequestParam(name = "resId", required = false) UUID resId,
            @RequestParam(name = "productName", required = false) String productName,
            @RequestParam(name = "resName", required = false) String resName,
            @RequestParam(name = "secName", required = false) String secName,
            @RequestParam(name = "status", required = false) LabelStatus status,
            @PageableDefault(size = 10, sort = "issueDate", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        var command = new PageFilterQueryCommand(
                resId,
                productName,
                resName,
                secName,
                status,
                pageable
        );

        Page<LabelSummary> response = labelService.findByFilters(command).map(LabelMapper::toLabelSummary);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabelInfo> getById(@PathVariable UUID id) {
        var label = labelService.getLabel(id);
        var response = LabelMapper.toLabelInfo(label);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable UUID id, @RequestParam LabelStatus status) {
        labelService.updateStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/maintenance/run-jobs")
    public ResponseEntity<Void> runExpirationJob() {
        labelService.checkAndExpireLabels();
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/maintenance/cleanup")
    public ResponseEntity<Void> runCleanup() {
        labelService.cleanOldLabels();
        return ResponseEntity.noContent().build();
    }
}