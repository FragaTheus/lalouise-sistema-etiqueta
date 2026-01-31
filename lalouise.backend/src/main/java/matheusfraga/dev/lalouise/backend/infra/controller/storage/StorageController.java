package matheusfraga.dev.lalouise.backend.infra.controller.storage;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.application.storage.StorageService;
import matheusfraga.dev.lalouise.backend.infra.controller.storage.utils.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class StorageController {

    private final StorageService service;

    @PostMapping("/sectors/{sectorId}/storages")
    public ResponseEntity<Void>  create
            (@PathVariable UUID sectorId, @Valid @RequestBody CreateStorageRequest request)
    {
        var command = StorageMapper.toCreateStorageCommand(sectorId, request);
        service.createStorage(command);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/sectors/{sectorId}/storages")
    public ResponseEntity<List<StorageSummary>> getAllStoragesBySector(
            @PathVariable UUID sectorId
    ){
        var summaries = service.findAllStorage(sectorId).stream().map(StorageMapper::toStorageSummary).toList();
        return ResponseEntity.ok(summaries);
    }

    @PatchMapping("/storages/{id}")
    public ResponseEntity<Void> update
            (@PathVariable UUID id, @Valid @RequestBody UpdateStorageNameRequest request)
    {
        service.updateStorageName(id, request.name());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/storages/{id}")
    public ResponseEntity<Void> delete
            (@PathVariable UUID id){
        service.deleteStorage(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("storages/{id}")
    public ResponseEntity<StorageInfo> getStorageInfo(
            @PathVariable UUID id
    ){
        var storage =  service.getStorage(id);
        var storageInfo = StorageMapper.toStorageInfo(storage);
        return ResponseEntity.ok(storageInfo);
    }

}
