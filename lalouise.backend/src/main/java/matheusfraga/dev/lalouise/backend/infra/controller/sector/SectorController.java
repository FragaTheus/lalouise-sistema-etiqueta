package matheusfraga.dev.lalouise.backend.infra.controller.sector;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.application.sector.SectorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/sectors")
@RequiredArgsConstructor
public class SectorController {

    private final SectorService service;

    @GetMapping("/{id}")
    public ResponseEntity<SectorInfo> getSectorInfo(@PathVariable UUID id){
        var sector =  service.getSector(id);
        var response = SectorMapper.toSectorInfo(sector);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody CreateSectorRequest request){
        var sector = service.createSector(request.name(), request.description());
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(sector.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update
            (@PathVariable UUID id, @Valid @RequestBody UpdateSectorRequest request)
    {
        var command = SectorMapper.toUpdateSectorInputCommand(id, request);
        service.updateSector(command);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        service.deleteSector(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SectorSummary>> getAllSectors(@RequestParam(name = "name") String name){
        var summaries =  service.getAllSectors(name).stream().map(SectorMapper::toSectorSummary).toList();
        return ResponseEntity.ok(summaries);
    }

}
