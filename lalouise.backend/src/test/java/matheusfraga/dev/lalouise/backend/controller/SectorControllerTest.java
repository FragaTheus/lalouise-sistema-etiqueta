package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.core.application.sector.SectorService;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.infra.controller.sector.CreateSectorRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.sector.SectorController;
import matheusfraga.dev.lalouise.backend.infra.controller.sector.UpdateSectorRequest;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(SectorController.class)
@AutoConfigureMockMvc(addFilters = false)
class SectorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private SectorService sectorService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TokenService tokenService;

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Deve retornar 201 e Location ao criar setor")
    void shouldCreateSectorAndReturnLocation() throws Exception {
        var request = new CreateSectorRequest("Cozinha01", "Setor de producao");
        var sectorId = UUID.randomUUID();
        var savedSector = new Sector(sectorId, "Cozinha01", "Setor de producao");

        when(sectorService.createSector(anyString(), anyString())).thenReturn(savedSector);

        mockMvc.perform(post("/api/v1/sectors")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(header().string("Location", org.hamcrest.Matchers.containsString(sectorId.toString())));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Deve retornar 400 ao tentar criar setor com nome inválido (com espaço)")
    void shouldReturnBadRequestWhenNameIsInvalid() throws Exception {

        var request = new CreateSectorRequest("Cozinha Com Espaco", "Descricao");

        mockMvc.perform(post("/api/v1/sectors")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Erro de validação nos campos: "))
                .andExpect(jsonPath("$.data.name").value("Formato de nome invalido."));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Deve retornar 204 ao atualizar setor com sucesso")
    void shouldReturnNoContentOnUpdate() throws Exception {
        var id = UUID.randomUUID();
        var request = new UpdateSectorRequest("NovoNome", "Nova Descricao");

        mockMvc.perform(patch("/api/v1/sectors/{id}", id)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Deve retornar 200 e dados do setor ao buscar por ID")
    void shouldReturnSectorInfo() throws Exception {
        var id = UUID.randomUUID();
        var sector = new Sector(id, "Cozinha", "Descricao");

        when(sectorService.getSector(id)).thenReturn(sector);

        mockMvc.perform(get("/api/v1/sectors/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Cozinha"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("Deve retornar lista de sumários ao buscar todos")
    void shouldReturnListOfSummaries() throws Exception {
        var sector = new Sector(UUID.randomUUID(), "Estoque", "Desc");

        when(sectorService.getAllSectors(any())).thenReturn(List.of(sector));

        mockMvc.perform(get("/api/v1/sectors")
                        .param("name", "Estoque"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Estoque"))
                // O summary não deve ter descrição, conforme seu Mapper
                .andExpect(jsonPath("$[0].description").doesNotExist());
    }
}
