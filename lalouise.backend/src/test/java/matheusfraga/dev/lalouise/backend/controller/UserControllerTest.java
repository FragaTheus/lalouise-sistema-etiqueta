package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.core.application.user.UserService;
import matheusfraga.dev.lalouise.backend.core.application.user.command.CreateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UpdateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UserFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.infra.controller.user.UserController;
import matheusfraga.dev.lalouise.backend.infra.controller.user.UserMapper;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.CreateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.DeleteUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.request.UpdateUserRequest;
import matheusfraga.dev.lalouise.backend.infra.controller.user.dto.response.*;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService service;

    @MockitoBean
    private TokenService tokenService;


    @Test
    void shouldCreateUser() throws Exception {
        CreateUserRequest request = new CreateUserRequest(
                "Matheus",
                "matheus@email.com",
                "Senha@123",
                "Senha@123"
        );

        User user = Mockito.mock(User.class);
        CreateUserInputCommand command = Mockito.mock(CreateUserInputCommand.class);
        CreateUserResponse response = CreateUserResponse.builder()
                .nickname("Matheus")
                .email("matheus@email.com")
                .role("USER")
                .message("Usuario criado com sucesso!")
                .build();

        try (MockedStatic<UserMapper> mapper = Mockito.mockStatic(UserMapper.class)) {

            mapper.when(() -> UserMapper.toCreateUserInputCommand(request))
                    .thenReturn(command);

            Mockito.when(service.createUser(command))
                    .thenReturn(user);

            mapper.when(() -> UserMapper.toCreateUserResponse(user))
                    .thenReturn(response);

            mockMvc.perform(post("/api/v1/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nickname").value("Matheus"))
                    .andExpect(jsonPath("$.email").value("matheus@email.com"))
                    .andExpect(jsonPath("$.message").value("Usuario criado com sucesso!"));
        }
    }


    @Test
    void shouldUpdateUser() throws Exception {
        UUID id = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                "Novo Nome",
                "Senha@123",
                "Senha@123"
        );

        User user = Mockito.mock(User.class);
        UpdateUserInputCommand command = Mockito.mock(UpdateUserInputCommand.class);

        UpdateUserResponse response = UpdateUserResponse.builder()
                .id(id)
                .nickname("Novo Nome")
                .email("email@email.com")
                .message("Usuario atualizado com sucesso!")
                .build();

        try (MockedStatic<UserMapper> mapper = Mockito.mockStatic(UserMapper.class)) {

            mapper.when(() -> UserMapper.toUpdateUserInputCommand(id, request))
                    .thenReturn(command);

            Mockito.when(service.updateUser(command))
                    .thenReturn(user);

            mapper.when(() -> UserMapper.toUpdateUserResponse(user))
                    .thenReturn(response);

            mockMvc.perform(patch("/api/v1/users/{id}", id)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nickname").value("Novo Nome"))
                    .andExpect(jsonPath("$.message").value("Usuario atualizado com sucesso!"));
        }
    }


    @Test
    void shouldDeleteUser() throws Exception {
        UUID id = UUID.randomUUID();

        DeleteUserRequest request = new DeleteUserRequest("Senha@123");

        Mockito.doNothing()
                .when(service)
                .deleteUser(id, request.password());

        mockMvc.perform(delete("/api/v1/users/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());
    }


    @Test
    void shouldGetUserById() throws Exception {
        UUID id = UUID.randomUUID();

        User user = Mockito.mock(User.class);
        UserInfo response = UserInfo.builder()
                .nickname("Matheus")
                .email("email@email.com")
                .role("USER")
                .build();

        try (MockedStatic<UserMapper> mapper = Mockito.mockStatic(UserMapper.class)) {

            Mockito.when(service.getUserById(id))
                    .thenReturn(user);

            mapper.when(() -> UserMapper.toUserInfo(user))
                    .thenReturn(response);

            mockMvc.perform(get("/api/v1/users/{id}", id))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nickname").value("Matheus"))
                    .andExpect(jsonPath("$.role").value("USER"));
        }
    }


    @Test
    void shouldGetAllUsers() throws Exception {
        User user = Mockito.mock(User.class);
        UserSummary summary = UserSummary.builder()
                .id(UUID.randomUUID())
                .nickname("Matheus")
                .build();

        UserFilterQueryCommand command = Mockito.mock(UserFilterQueryCommand.class);

        try (MockedStatic<UserMapper> mapper = Mockito.mockStatic(UserMapper.class)) {

            mapper.when(() -> UserMapper.toFilterQueryCommand("Matheus", null, Role.USER))
                    .thenReturn(command);

            Mockito.when(service.getAllUsers(command))
                    .thenReturn(List.of(user));

            mapper.when(() -> UserMapper.toUserSummary(user))
                    .thenReturn(summary);

            mockMvc.perform(get("/api/v1/users")
                            .param("nickname", "Matheus")
                            .param("role", "USER"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].nickname").value("Matheus"));
        }
    }
}