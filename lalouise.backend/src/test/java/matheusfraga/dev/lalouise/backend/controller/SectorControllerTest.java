package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.application.service.SectorService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.SectorController;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.CreateSectorRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.sector.dto.UpdateSectorRequest;
import matheusfraga.dev.lalouise.backend.infra.security.TokenFilter;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SectorController.class)
@AutoConfigureMockMvc(addFilters = false)
class SectorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private SectorService sectorService;

    @MockitoBean
    private TokenFilter tokenFilter;

    @MockitoBean
    private TokenService tokenService;

    @Test
    @DisplayName("Deve buscar informações do setor por ID com sucesso")
    void shouldGetSectorInfo() throws Exception {
        var id = UUID.randomUUID();

        var responsible = mock(Account.class);
        when(responsible.getNickname()).thenReturn("Matheus");

        var sector = mock(Sector.class);
        when(sector.getId()).thenReturn(id);
        when(sector.getName()).thenReturn("Almoxarifado");
        when(sector.getDescription()).thenReturn("Setor de armazenamento");
        when(sector.getResponsible()).thenReturn(responsible);

        when(sectorService.getSector(id)).thenReturn(sector);

        mockMvc.perform(get("/api/v1/sectors/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.responsibleName").value("Matheus"));
    }

    @Test
    @DisplayName("Deve criar um novo setor")
    void shouldCreateSector() throws Exception {
        var request = new CreateSectorRequest(
                "Estoque Central",
                "Descricao valida",
                List.of(StorageType.AMBIENTE),
                UUID.randomUUID()
        );

        mockMvc.perform(post("/api/v1/sectors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(sectorService, times(1)).createSector(any());
    }

    @Test
    @DisplayName("Deve retornar 400 ao tentar criar setor com nome contendo caracteres especiais")
    void shouldReturn400WhenNameHasSpecialCharacters() throws Exception {
        // O Regex ^[\p{L} ]+$ não permite @, #, etc.
        var request = new CreateSectorRequest(
                "Setor @ Errado",
                "Descricao",
                List.of(StorageType.AMBIENTE),
                UUID.randomUUID()
        );

        mockMvc.perform(post("/api/v1/sectors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Deve atualizar setor com sucesso passando ID na URL")
    void shouldUpdateSector() throws Exception {
        var id = UUID.randomUUID();
        var request = new UpdateSectorRequest(
                "Novo Nome",
                "Nova Descricao",
                List.of(StorageType.AMBIENTE),
                UUID.randomUUID()
        );

        mockMvc.perform(patch("/api/v1/sectors/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());

        verify(sectorService).updateSector(any());
    }

    @Test
    @DisplayName("Deve listar resumos de setores")
    void shouldListAllSectors() throws Exception {
        var sector = mock(Sector.class);
        when(sector.getId()).thenReturn(UUID.randomUUID());
        when(sector.getName()).thenReturn("Setor A");

        when(sectorService.getAllSectors(any())).thenReturn(List.of(sector));

        mockMvc.perform(get("/api/v1/sectors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Setor A"));
    }
}
