package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.core.application.storage.StorageService;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Storage;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.infra.controller.storage.StorageController;
import matheusfraga.dev.lalouise.backend.infra.controller.storage.utils.CreateStorageRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.storage.utils.UpdateStorageNameRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.UserController;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(StorageController.class)
@AutoConfigureMockMvc(addFilters = false)
class StorageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private StorageService storageService;

    @MockitoBean
    private TokenService tokenService;

    @Test
    @DisplayName("Deve retornar 201 ao criar um storage com sucesso")
    void shouldReturnCreatedWhenCreateStorage() throws Exception {
        UUID sectorId = UUID.randomUUID();
        CreateStorageRequest request = new CreateStorageRequest("Freezer", StorageType.CONGELADO);

        mockMvc.perform(post("/api/v1/sectors/{sectorId}/storages", sectorId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Deve retornar 200 e uma lista ao buscar por setor")
    void shouldReturnOkAndListWhenGetAllBySector() throws Exception {
        UUID sectorId = UUID.randomUUID();
        Sector sector = new Sector("Cozinha");
        Storage storage = new Storage("Freezer", StorageType.CONGELADO, sector);

        when(storageService.findAllStorage(sectorId)).thenReturn(List.of(storage));

        mockMvc.perform(get("/api/v1/sectors/{sectorId}/storages", sectorId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Freezer"));
    }

    @Test
    @DisplayName("Deve retornar 204 ao atualizar o nome com sucesso")
    void shouldReturnNoContentWhenUpdateStorage() throws Exception {
        UUID storageId = UUID.randomUUID();
        UpdateStorageNameRequest request = new UpdateStorageNameRequest("NovoNome");

        mockMvc.perform(patch("/api/v1/storages/{id}", storageId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("Deve retornar 204 ao deletar com sucesso")
    void shouldReturnNoContentWhenDeleteStorage() throws Exception {
        UUID storageId = UUID.randomUUID();

        mockMvc.perform(delete("/api/v1/storages/{id}", storageId))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("Deve retornar 200 e detalhes ao buscar por ID")
    void shouldReturnOkAndDetailsWhenGetById() throws Exception {
        UUID storageId = UUID.randomUUID();
        Sector sector = new Sector("Cozinha");
        Storage storage = new Storage("Freezer", StorageType.CONGELADO, sector);

        when(storageService.getStorage(storageId)).thenReturn(storage);

        mockMvc.perform(get("/api/v1/storages/{id}", storageId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Freezer"));
    }
}
