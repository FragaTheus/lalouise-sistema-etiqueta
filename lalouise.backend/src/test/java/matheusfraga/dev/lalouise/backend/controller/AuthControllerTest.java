package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.application.service.AuthService;
import matheusfraga.dev.lalouise.backend.infra.in.controller.auth.AuthController;
import matheusfraga.dev.lalouise.backend.infra.in.controller.auth.LoginRequest;
import matheusfraga.dev.lalouise.backend.infra.security.TokenFilter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false) // Desativa filtros para focar na lógica do controller
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private TokenFilter tokenFilter;

    @Test
    @DisplayName("Deve realizar login com sucesso e retornar o token")
    void shouldLoginSuccessfully() throws Exception {

        var request = new LoginRequest("teste@email.com", "Senha@123");
        String fakeToken = "jwt-token-gerado";

        when(authService.login(request.email(), request.password())).thenReturn(fakeToken);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(fakeToken));

        verify(authService, times(1)).login(anyString(), anyString());
    }

    @Test
    @DisplayName("Deve retornar 400 quando o email for inválido")
    void shouldReturn400WhenEmailIsInvalid() throws Exception {
        var request = new LoginRequest("email-invalido", "Senha@123");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(authService);
    }

    @Test
    @DisplayName("Deve retornar 400 quando a senha não seguir o padrão de segurança")
    void shouldReturn400WhenPasswordIsWeak() throws Exception {
        var request = new LoginRequest("teste@email.com", "123");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(authService);
    }
}
