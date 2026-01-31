package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.core.application.sector.SectorService;
import matheusfraga.dev.lalouise.backend.core.application.sector.UpdateSectorInputCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.exception.sector.SectorAlreadyExistsException;
import matheusfraga.dev.lalouise.backend.core.domain.exception.sector.SectorNotFoundException;
import matheusfraga.dev.lalouise.backend.core.domain.repository.SectorRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SectorServiceTest {

    @Mock
    private SectorRepository sectorRepository;

    @InjectMocks
    private SectorService sectorService;

    @Test
    @DisplayName("Deve criar um setor com sucesso")
    void shouldCreateSectorSuccessfully() {
        String name = "Cozinha";
        String description = "Setor de produção";

        when(sectorRepository.existsByNameValueIgnoreCase(name)).thenReturn(false);
        when(sectorRepository.save(any(Sector.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Sector result = sectorService.createSector(name, description);

        assertNotNull(result);
        assertEquals(name, result.getName());
        verify(sectorRepository).save(any(Sector.class));
    }

    @Test
    @DisplayName("Deve lançar exceção ao criar setor com nome já existente")
    void shouldThrowExceptionWhenSectorNameAlreadyExists() {
        String name = "Cozinha";
        when(sectorRepository.existsByNameValueIgnoreCase(name)).thenReturn(true);

        assertThrows(SectorAlreadyExistsException.class, () ->
                sectorService.createSector(name, "Descrição")
        );
        verify(sectorRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve atualizar apenas a descrição quando o nome for igual ao atual")
    void shouldUpdateOnlyDescriptionWhenNameIsSame() {
        UUID id = UUID.randomUUID();
        Sector existingSector = new Sector(id, "Cozinha", "Antiga Descrição");
        UpdateSectorInputCommand command = new UpdateSectorInputCommand(id, "Cozinha", "Nova Descrição");

        when(sectorRepository.findById(id)).thenReturn(Optional.of(existingSector));
        when(sectorRepository.save(any(Sector.class))).thenReturn(existingSector);

        Sector result = sectorService.updateSector(command);

        assertEquals("Nova Descrição", result.getDescription());
        assertEquals("Cozinha", result.getName());
        // Não deve validar se o nome existe, pois o nome não mudou
        verify(sectorRepository, never()).existsByNameValueIgnoreCase(anyString());
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar mudar nome para um que já existe em outro setor")
    void shouldThrowExceptionWhenUpdatingToExistingName() {
        UUID id = UUID.randomUUID();
        Sector existingSector = new Sector(id, "Cozinha", "Desc");
        UpdateSectorInputCommand command = new UpdateSectorInputCommand(id, "Estoque", "Desc");

        when(sectorRepository.findById(id)).thenReturn(Optional.of(existingSector));
        when(sectorRepository.existsByNameValueIgnoreCase("Estoque")).thenReturn(true);

        assertThrows(SectorAlreadyExistsException.class, () -> sectorService.updateSector(command));
    }

    @Test
    @DisplayName("Deve deletar um setor com sucesso")
    void shouldDeleteSector() {
        UUID id = UUID.randomUUID();

        sectorService.deleteSector(id);

        verify(sectorRepository, times(1)).deleteById(id);
    }
}