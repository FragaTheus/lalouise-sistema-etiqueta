package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelCommand;
import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelOverOldLabelCommand;
import matheusfraga.dev.lalouise.backend.application.service.LabelService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.infra.in.controller.label.CreateLabelOverOldLabelRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.label.CreateLabelRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.label.LabelController;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LabelController.class)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("LabelController - Testes de Unidade (Web)")
class LabelControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @MockitoBean private LabelService labelService;
    @MockitoBean private TokenService tokenService;

    @Test
    @DisplayName("Deve retornar 201 ao criar uma etiqueta com sucesso")
    void shouldReturnCreatedWhenCreateLabelIsValid() throws Exception {
        UUID prodId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        var principal = mock(matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl.class);
        when(principal.getId()).thenReturn(userId);

        var request = new CreateLabelRequest(prodId, StorageType.REFRIGERADO, 2);

        when(labelService.createLabel(any(CreateLabelCommand.class))).thenReturn(mock(Label.class));

        var auth = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                java.util.List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        mockMvc.perform(post("/api/v1/labels/print")
                        .with(authentication(auth))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(labelService).createLabel(any(CreateLabelCommand.class));
    }

    @Test
    @DisplayName("Deve retornar 201 ao solicitar a reimpressão")
    void shouldReturnCreatedWhenReprintIsSuccessful() throws Exception {
        UUID oldLabelId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        var principal = mock(matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl.class);
        when(principal.getId()).thenReturn(userId);

        var request = new CreateLabelOverOldLabelRequest(StorageType.AMBIENTE, 3);

        when(labelService.createLabelOverOldLabel(any(CreateLabelOverOldLabelCommand.class))).thenReturn(mock(Label.class));

        var auth = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                java.util.List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        mockMvc.perform(post("/api/v1/labels/{oldLabelId}/reprint", oldLabelId)
                        .with(authentication(auth))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(labelService).createLabelOverOldLabel(any(CreateLabelOverOldLabelCommand.class));
    }

    @Test
    @DisplayName("Deve retornar o lote ao buscar etiqueta por ID")
    void shouldReturnLoteWhenGettingLabelById() throws Exception {
        UUID labelId = UUID.randomUUID();
        Label label = buildLabel(labelId, "L000123");

        when(labelService.getLabel(labelId)).thenReturn(label);

        mockMvc.perform(get("/api/v1/labels/{id}", labelId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lote").value("L000123"))
                .andExpect(jsonPath("$.product").value("Sopa"));
    }

    @Test
    @DisplayName("Deve retornar o lote nos dados de reimpressão")
    void shouldReturnLoteWhenGettingReprintData() throws Exception {
        UUID labelId = UUID.randomUUID();
        Label label = buildLabel(labelId, "L000123");

        when(labelService.getLabel(labelId)).thenReturn(label);

        mockMvc.perform(get("/api/v1/labels/{id}/reprint-data", labelId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(labelId.toString()))
                .andExpect(jsonPath("$.lote").value("L000123"))
                .andExpect(jsonPath("$.productName").value("Sopa"));
    }

    @Test
    @DisplayName("Deve retornar 204 ao rodar limpeza de etiquetas antigas")
    void shouldReturnNoContentWhenRunningCleanup() throws Exception {
        mockMvc.perform(delete("/api/v1/labels/maintenance/cleanup"))
                .andExpect(status().isNoContent());

        verify(labelService).cleanOldLabels();
    }

    @Test
    @DisplayName("Deve retornar 202 ao rodar job de expiração manualmente")
    void shouldReturnAcceptedWhenRunJobs() throws Exception {
        mockMvc.perform(post("/api/v1/labels/maintenance/run-jobs"))
                .andExpect(status().isAccepted());

        verify(labelService).checkAndExpireLabels();
    }

    private Label buildLabel(UUID labelId, String lote) {
        Product product = mock(Product.class);
        when(product.getId()).thenReturn(UUID.randomUUID());
        when(product.getName()).thenReturn("Sopa");

        Sector sector = mock(Sector.class);
        when(sector.getName()).thenReturn("Cozinha");

        Account responsible = mock(Account.class);
        when(responsible.getNickname()).thenReturn("Matheus");

        return new Label(labelId, product, sector, responsible, LocalDate.now(), LocalDate.now().plusDays(3), LabelStatus.ATIVA, lote);
    }
}