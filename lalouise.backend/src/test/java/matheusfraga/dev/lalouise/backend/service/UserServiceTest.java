package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.core.application.user.command.CreateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UpdateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.UserService;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UserFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.exception.user.*;
import matheusfraga.dev.lalouise.backend.core.domain.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Testes do Serviço de Usuário")
class UserServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private BCryptPasswordEncoder encoder;
    @InjectMocks private UserService userService;

    private UUID userId;
    private CreateUserInputCommand createCommand;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        createCommand = new CreateUserInputCommand("Matheus", "teste@email.com", "senha123", "senha123");
    }

    @Nested
    @DisplayName("Criação de Usuários")
    class CreateTests {
        @Test
        @DisplayName("Deve criar USER com sucesso")
        void shouldCreateUser() {
            when(userRepository.existsByEmailValueIgnoreCase(anyString())).thenReturn(false);
            when(encoder.encode(anyString())).thenReturn("$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5");
            when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

            User user = userService.createUser(createCommand);

            assertAll(
                    () -> assertEquals(Role.USER, user.getRole()),
                    () -> verify(userRepository).save(any())
            );
        }

        @Test
        @DisplayName("Deve lançar EmailAlreadyExists se e-mail já estiver em uso")
        void shouldThrowEmailAlreadyExists() {
            when(userRepository.existsByEmailValueIgnoreCase(anyString())).thenReturn(true);
            assertThrows(EmailAlreadyExists.class, () -> userService.createUser(createCommand));
        }

        @Test
        @DisplayName("Deve lançar PasswordDontMatchException se senhas forem diferentes")
        void shouldThrowPasswordMismatch() {
            var cmd = new CreateUserInputCommand("M", "e@e.com", "123", "321");
            assertThrows(PasswordDontMatchException.class, () -> userService.createUser(cmd));
        }
    }

    @Nested
    @DisplayName("Atualização de Usuários")
    class UpdateTests {
        @Test
        @DisplayName("Deve atualizar nickname e senha simultaneamente")
        void shouldUpdateAllFields() {
            String plainPassword = "Senha123";
            String hashedPassword = "$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5";
            User user = new User("name", "email@email.com",  hashedPassword, Role.USER);
            var cmd = new UpdateUserInputCommand(userId, "New", plainPassword, plainPassword);

            when(userRepository.findById(userId)).thenReturn(Optional.of(user));
            when(userRepository.save(any())).thenAnswer(i -> i.getArgument(0));
            when(encoder.encode(plainPassword)).thenReturn(hashedPassword);
            User updated = userService.updateUser(cmd);

            assertEquals("New", updated.getNickname().value());
            verify(encoder).encode(plainPassword);
        }

        @Test
        @DisplayName("Deve lançar NoDataForUpdateException se comando for vazio")
        void shouldThrowNoData() {
            var cmd = new UpdateUserInputCommand(userId, null, null, null);
            assertThrows(NoDataForUpdateException.class, () -> userService.updateUser(cmd));
        }
    }

    @Nested
    @DisplayName("Exclusão de Usuários")
    class DeleteTests {
        @Test
        @DisplayName("Deve deletar usuário quando senha do administrador estiver correta")
        void shouldDeleteUser() {
            mockSecurityContext("admin@email.com");
            User admin = new User("name", "email@email.com",  "$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5", Role.USER);

            when(userRepository.findByEmailValueIgnoreCase("admin@email.com")).thenReturn(Optional.of(admin));
            when(encoder.matches(anyString(), anyString())).thenReturn(true);

            userService.deleteUser(userId, "senhaAdmin");

            verify(userRepository).deleteById(userId);
        }

        @Test
        @DisplayName("Deve lançar WrongPasswordException se senha do admin falhar")
        void shouldThrowWrongPassword() {
            mockSecurityContext("admin@email.com");
            User admin = new User("name", "email@email.com",  "$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5", Role.USER);

            when(userRepository.findByEmailValueIgnoreCase("admin@email.com")).thenReturn(Optional.of(admin));
            when(encoder.matches(anyString(), anyString())).thenReturn(false);

            assertThrows(WrongPasswordException.class, () -> userService.deleteUser(userId, "errada"));
        }

        private void mockSecurityContext(String email) {
            Authentication auth = mock(Authentication.class);
            SecurityContext securityContext = mock(SecurityContext.class);
            when(auth.getName()).thenReturn(email);
            when(securityContext.getAuthentication()).thenReturn(auth);
            SecurityContextHolder.setContext(securityContext);
        }
    }

    @Nested
    @DisplayName("Consultas")
    class QueryTests {
        @Test
        @DisplayName("Deve buscar usuário por ID")
        void shouldFindById() {
            when(userRepository.findById(userId)).thenReturn(Optional.of(new User(
                    "name", "email@email.com",  "$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5", Role.USER
            )));
            assertNotNull(userService.getUserById(userId));
        }

        @Test
        @DisplayName("Deve lançar UserNotFoundException se ID não existir")
        void shouldThrowNotFound() {
            when(userRepository.findById(userId)).thenReturn(Optional.empty());
            assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
        }

        @Test
        @DisplayName("Deve chamar filtros do repositório corretamente")
        void shouldCallFilters() {
            var filter = UserFilterQueryCommand.builder()
                            .nickname("nickname")
                            .email("email@email")
                            .role(Role.USER)
                            .build();
            userService.getAllUsers(filter);
            verify(userRepository).findByFilters("nickname", "email@email", Role.USER);
        }
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }
}