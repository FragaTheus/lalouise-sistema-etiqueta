package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.core.application.sector.SectorService;
import matheusfraga.dev.lalouise.backend.core.application.storage.CreateStorageCommand;
import matheusfraga.dev.lalouise.backend.core.application.storage.StorageService;
import matheusfraga.dev.lalouise.backend.core.application.user.UserService;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.core.domain.exception.storage.SameStorageNameException;
import matheusfraga.dev.lalouise.backend.core.domain.exception.storage.StorageNotFoundException;
import matheusfraga.dev.lalouise.backend.core.domain.repository.StorageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StorageServiceTest {

    @Mock
    private StorageRepository repository;
    @Mock
    private SectorService sectorService;
    @Mock
    private UserService userService;
    @Mock
    private BCryptPasswordEncoder encoder;

    @InjectMocks
    private StorageService storageService;

    private UUID storageId;
    private UUID sectorId;
    private Sector sector;

    @BeforeEach
    void setUp() {
        storageId = UUID.randomUUID();
        sectorId = UUID.randomUUID();
        sector = mock(Sector.class); // Mock do setor para o Storage
    }

    @Test
    @DisplayName("Deve criar um storage com sucesso")
    void createStorage_Success() {
        var command = new CreateStorageCommand(sectorId, "Freezer 01", StorageType.REFRIGERADO);
        when(sectorService.getSector(sectorId)).thenReturn(sector);
        when(repository.save(any(Storage.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Storage result = storageService.createStorage(command);

        assertNotNull(result);
        assertEquals("Freezer 01", result.getName());
        verify(repository, times(1)).save(any(Storage.class));
    }

    @Test
    @DisplayName("Deve lançar exceção ao atualizar com o mesmo nome")
    void updateStorageName_ThrowsException_WhenNameIsSame() {
        String sameName = "Freezer 01";
        Storage storage = new Storage(sameName, StorageType.AMBIENTE, sector);

        when(repository.findById(storageId)).thenReturn(Optional.of(storage));

        assertThrows(SameStorageNameException.class, () ->
                storageService.updateStorageName(storageId, sameName)
        );
    }

    @Test
    @DisplayName("Deve lançar exceção quando storage não for encontrado")
    void getStorage_ThrowsException_WhenNotFound() {
        when(repository.findById(storageId)).thenReturn(Optional.empty());

        assertThrows(StorageNotFoundException.class, () -> storageService.getStorage(storageId));
    }
}