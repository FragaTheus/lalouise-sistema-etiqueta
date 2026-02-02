package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.core.application.user.command.CreateAccountCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.AccountService;
import matheusfraga.dev.lalouise.backend.core.application.user.command.AccountFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.exception.user.*;
import matheusfraga.dev.lalouise.backend.core.domain.repository.AccountRepository;
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
class AccountServiceTest {

    @Mock private AccountRepository accountRepository;
    @Mock private BCryptPasswordEncoder encoder;
    @InjectMocks private AccountService accountService;

    private UUID userId;
    private CreateAccountCommand createCommand;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        createCommand = new CreateAccountCommand("Matheus", "teste@email.com", "senha123", "senha123");
    }

    @Nested
    @DisplayName("Criação de Usuários")
    class CreateTests {
        @Test
        @DisplayName("Deve criar USER com sucesso")
        void shouldCreateUser() {
            when(accountRepository.existsByEmailIgnoreCase(anyString())).thenReturn(false);
            when(encoder.encode(anyString())).thenReturn("$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5");
            when(accountRepository.save(any(Account.class))).thenAnswer(i -> i.getArgument(0));

            Account account = accountService.createUser(createCommand);

            assertAll(
                    () -> assertEquals(Role.USER, account.getRole()),
                    () -> verify(accountRepository).save(any())
            );
        }

        @Test
        @DisplayName("Deve lançar EmailAlreadyExists se e-mail já estiver em uso")
        void shouldThrowEmailAlreadyExists() {
            when(accountRepository.existsByEmailIgnoreCase(anyString())).thenReturn(true);
            assertThrows(EmailAlreadyExists.class, () -> accountService.createUser(createCommand));
        }

        @Test
        @DisplayName("Deve lançar PasswordDontMatchException se senhas forem diferentes")
        void shouldThrowPasswordMismatch() {
            var cmd = new CreateAccountCommand("M", "e@e.com", "123", "321");
            assertThrows(PasswordDontMatchException.class, () -> accountService.createUser(cmd));
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
            Account account = new Account("name", "email@email.com",  hashedPassword, Role.USER);
            var cmd = new UpdateAccountCommand(userId, "New", plainPassword, plainPassword);

            when(accountRepository.findById(userId)).thenReturn(Optional.of(account));
            when(accountRepository.save(any())).thenAnswer(i -> i.getArgument(0));
            when(encoder.encode(plainPassword)).thenReturn(hashedPassword);
            Account updated = accountService.updateUser(cmd);

            assertEquals("New", updated.getNickname());
            verify(encoder).encode(plainPassword);
        }

        @Test
        @DisplayName("Deve lançar NoDataForUpdateException se comando for vazio")
        void shouldThrowNoData() {
            var cmd = new UpdateAccountCommand(userId, null, null, null);
            assertThrows(NoDataForUpdateException.class, () -> accountService.updateUser(cmd));
        }
    }

    @Nested
    @DisplayName("Exclusão de Usuários")
    class DeleteTests {
        @Test
        @DisplayName("Deve deletar usuário quando senha do administrador estiver correta")
        void shouldDeleteUser() {
            mockSecurityContext("admin@email.com");
            Account admin = new Account("name", "email@email.com",  "$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5", Role.USER);

            when(accountRepository.findByEmailIgnoreCase("admin@email.com")).thenReturn(Optional.of(admin));
            when(encoder.matches(anyString(), anyString())).thenReturn(true);

            accountService.deleteUser(userId, "senhaAdmin");

            verify(accountRepository).deleteById(userId);
        }

        @Test
        @DisplayName("Deve lançar WrongPasswordException se senha do admin falhar")
        void shouldThrowWrongPassword() {
            mockSecurityContext("admin@email.com");
            Account admin = new Account("name", "email@email.com",  "$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5", Role.USER);

            when(accountRepository.findByEmailIgnoreCase("admin@email.com")).thenReturn(Optional.of(admin));
            when(encoder.matches(anyString(), anyString())).thenReturn(false);

            assertThrows(WrongPasswordException.class, () -> accountService.deleteUser(userId, "errada"));
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
            when(accountRepository.findById(userId)).thenReturn(Optional.of(new Account(
                    "name", "email@email.com",  "$2a$10$vI8vh95Fm9W8Y.LBY295uO6Y8P9YI4.z0Y5A6K5G3C5.K5G3C5.K5", Role.USER
            )));
            assertNotNull(accountService.getUserById(userId));
        }

        @Test
        @DisplayName("Deve lançar UserNotFoundException se ID não existir")
        void shouldThrowNotFound() {
            when(accountRepository.findById(userId)).thenReturn(Optional.empty());
            assertThrows(UserNotFoundException.class, () -> accountService.getUserById(userId));
        }

        @Test
        @DisplayName("Deve chamar filtros do repositório corretamente")
        void shouldCallFilters() {
            var filter = AccountFilterQueryCommand.builder()
                            .nickname("nickname")
                            .email("email@email")
                            .role(Role.USER)
                            .build();
            accountService.getAllUsers(filter);
            verify(accountRepository).findByFilters("nickname", "email@email", Role.USER);
        }
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }
}