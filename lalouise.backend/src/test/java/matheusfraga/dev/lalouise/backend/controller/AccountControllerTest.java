package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.application.service.AccountService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.AccountController;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.CreateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.in.controller.account.dto.UpdateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.security.TokenFilter;
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

@WebMvcTest(AccountController.class)
@AutoConfigureMockMvc(addFilters = false)
class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AccountService accountService;

    @MockitoBean
    private TokenFilter tokenFilter;

    @Test
    @DisplayName("Deve criar um usuário comum com sucesso e retornar 201")
    void shouldCreateUserSuccessfully() throws Exception {
        var request = new CreateUserRequest(
                "Matheus",
                "matheus@email.com",
                "Senha@123",
                "Senha@123"
        );

        mockMvc.perform(post("/api/v1/accounts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(accountService, times(1)).createUser(any());
    }

    @Test
    @DisplayName("Deve criar um admin com sucesso e retornar 201")
    void shouldCreateAdminSuccessfully() throws Exception {
        var request = new CreateUserRequest(
                "Admin",
                "admin@email.com",
                "Admin@123",
                "Admin@123"
        );

        mockMvc.perform(post("/api/v1/accounts/admins")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(accountService, times(1)).createAdmin(any());
    }

    @Test
    @DisplayName("Deve atualizar um usuário e retornar 200")
    void shouldUpdateUserSuccessfully() throws Exception {
        UUID id = UUID.randomUUID();
        var request = new UpdateUserRequest("NovoNickname", "Senha@654", "Senha@654");

        mockMvc.perform(patch("/api/v1/accounts/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(accountService, times(1)).updateUser(any());
    }

    @Test
    @DisplayName("Deve deletar um usuário e retornar 204")
    void shouldDeleteUserSuccessfully() throws Exception {
        UUID id = UUID.randomUUID();

        mockMvc.perform(delete("/api/v1/accounts/{id}", id))
                .andExpect(status().isNoContent());

        verify(accountService, times(1)).deleteUser(id);
    }

    @Test
    @DisplayName("Deve buscar um usuário por ID e retornar 200 com UserInfo")
    void shouldGetUserById() throws Exception {
        UUID id = UUID.randomUUID();
        // Mockando a entidade de retorno (precisa de uma conta real ou mockada)
        Account account = mock(Account.class);
        when(account.getNickname()).thenReturn("Matheus");
        when(account.getEmail()).thenReturn("matheus@email.com");
        when(account.getRole()).thenReturn(Role.USER);

        when(accountService.getUserById(id)).thenReturn(account);

        mockMvc.perform(get("/api/v1/accounts/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value("Matheus"))
                .andExpect(jsonPath("$.email").value("matheus@email.com"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    @DisplayName("Deve listar usuários filtrados e retornar 200")
    void shouldGetAllUsersWithFilters() throws Exception {
        Account account = mock(Account.class);
        when(account.getId()).thenReturn(UUID.randomUUID());
        when(account.getNickname()).thenReturn("Matheus");

        when(accountService.getAllUsers(any())).thenReturn(List.of(account));

        mockMvc.perform(get("/api/v1/accounts")
                        .param("nickname", "Matheus")
                        .param("role", "USER"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nickname").value("Matheus"))
                .andExpect(jsonPath("$.length()").value(1));
    }
}
