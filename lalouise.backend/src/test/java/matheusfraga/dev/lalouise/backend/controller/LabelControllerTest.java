package matheusfraga.dev.lalouise.backend.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.application.service.LabelService;
import matheusfraga.dev.lalouise.backend.application.service.PrintService;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.infra.in.controller.label.CreateLabelRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.label.LabelController;
import matheusfraga.dev.lalouise.backend.infra.in.controller.label.LabelReprintRequest;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LabelController.class)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("LabelController - Testes de Unidade (Web)")
class LabelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private LabelService labelService;

    @MockitoBean
    private PrintService printService;

    @MockitoBean
    private TokenService tokenService;

    @Test
    @DisplayName("Deve retornar 201 ao criar uma etiqueta com sucesso")
    void shouldReturnCreatedWhenCreateLabelIsValid() throws Exception {
        var request = CreateLabelRequest.builder()
                .productId(UUID.randomUUID())
                .responsibleId(UUID.randomUUID())
                .sectorId(UUID.randomUUID())
                .storageType(StorageType.REFRIGERADO)
                .build();

        mockMvc.perform(post("/api/v1/labels/print")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Deve retornar 204 ao rodar limpeza de etiquetas antigas")
    void shouldReturnNoContentWhenRunningCleanup() throws Exception {
        doNothing().when(labelService).cleanOldLabels();

        mockMvc.perform(delete("/api/v1/labels/maintenance/cleanup"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("Deve retornar 201 ao solicitar a reimpressão de uma etiqueta")
    void shouldReturnCreatedWhenReprintIsSuccessful() throws Exception {
        UUID oldLabelId = UUID.randomUUID();

        var request = new LabelReprintRequest(
                UUID.randomUUID(),
                UUID.randomUUID(),
                StorageType.AMBIENTE
        );

        Label mockNewLabel = mock(Label.class);
        when(labelService.updateLabelStatus(any())).thenReturn(mockNewLabel);

        mockMvc.perform(post("/api/v1/labels/{oldLabelId}/reprint", oldLabelId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isCreated());

        verify(printService).printLabel(mockNewLabel);
    }

    @Test
    @DisplayName("Deve retornar 202 ao rodar job de expiração manualmente")
    void shouldReturnAcceptedWhenRunJobs() throws Exception {
        mockMvc.perform(post("/api/v1/labels/maintenance/run-jobs"))
                .andExpect(status().isAccepted());
    }
}