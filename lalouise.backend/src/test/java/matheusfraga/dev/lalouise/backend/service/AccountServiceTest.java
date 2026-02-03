package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.application.command.AccountFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.application.command.CreateAccountCommand;
import matheusfraga.dev.lalouise.backend.application.command.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.application.service.AccountService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.exception.user.*;
import matheusfraga.dev.lalouise.backend.domain.repository.AccountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @Mock
    private BCryptPasswordEncoder encoder;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountService accountService;

    private CreateAccountCommand validCreateCommand;
    private UpdateAccountCommand validUpdateCommand;
    private UUID userId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        validCreateCommand = CreateAccountCommand.builder()
                .nickname("João Silva")
                .email("joao@email.com")
                .password("Senha@123")
                .confirmPassword("Senha@123")
                .build();

        validUpdateCommand = UpdateAccountCommand.builder()
                .id(userId)
                .nickname("João Silva Atualizado")
                .password(null)
                .confirmPassword(null)
                .build();
    }


    @Test
    @DisplayName("Deve criar usuário com role USER com sucesso")
    void shouldCreateUserSuccessfully() {
        // Arrange
        when(accountRepository.existsByEmailIgnoreCase(validCreateCommand.email())).thenReturn(false);
        when(encoder.encode(validCreateCommand.password())).thenReturn("hashedPassword");

        // Act
        accountService.createUser(validCreateCommand);

        // Assert
        ArgumentCaptor<Account> accountCaptor = ArgumentCaptor.forClass(Account.class);
        verify(accountRepository).save(accountCaptor.capture());

        Account savedAccount = accountCaptor.getValue();
        assertThat(savedAccount.getNickname()).isEqualTo("João Silva");
        assertThat(savedAccount.getEmail()).isEqualTo("joao@email.com");
        assertThat(savedAccount.getPassword()).isEqualTo("hashedPassword");
        assertThat(savedAccount.getRole()).isEqualTo(Role.USER);
    }

    @Test
    @DisplayName("Deve criar usuário com role ADMIN com sucesso")
    void shouldCreateAdminSuccessfully() {
        // Arrange
        when(accountRepository.existsByEmailIgnoreCase(validCreateCommand.email())).thenReturn(false);
        when(encoder.encode(validCreateCommand.password())).thenReturn("hashedPassword");

        // Act
        accountService.createAdmin(validCreateCommand);

        // Assert
        ArgumentCaptor<Account> accountCaptor = ArgumentCaptor.forClass(Account.class);
        verify(accountRepository).save(accountCaptor.capture());

        Account savedAccount = accountCaptor.getValue();
        assertThat(savedAccount.getRole()).isEqualTo(Role.ADMIN);
    }

    @Test
    @DisplayName("Deve lançar exceção quando senhas não conferem na criação")
    void shouldThrowExceptionWhenPasswordsDontMatchOnCreate() {

        CreateAccountCommand command = CreateAccountCommand.builder()
                .nickname("João Silva")
                .email("joao@email.com")
                .password("Senha@123")
                .confirmPassword("SenhaDiferente@123")
                .build();

        assertThatThrownBy(() -> accountService.createUser(command))
                .isInstanceOf(PasswordDontMatchException.class);

        verify(accountRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve lançar exceção quando email já existe")
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        when(accountRepository.existsByEmailIgnoreCase(validCreateCommand.email())).thenReturn(true);

        assertThatThrownBy(() -> accountService.createUser(validCreateCommand))
                .isInstanceOf(EmailAlreadyExists.class);

        verify(accountRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve verificar email case-insensitive ao criar")
    void shouldCheckEmailCaseInsensitiveOnCreate() {

        when(accountRepository.existsByEmailIgnoreCase("JOAO@EMAIL.COM")).thenReturn(true);

        CreateAccountCommand command = CreateAccountCommand.builder()
                .nickname("João")
                .email("JOAO@EMAIL.COM")
                .password("Senha@123")
                .confirmPassword("Senha@123")
                .build();

        assertThatThrownBy(() -> accountService.createUser(command))
                .isInstanceOf(EmailAlreadyExists.class);

        verify(accountRepository).existsByEmailIgnoreCase("JOAO@EMAIL.COM");
    }


    @Test
    @DisplayName("Deve atualizar nickname com sucesso")
    void shouldUpdateNicknameSuccessfully() {

        Account existingAccount = new Account(userId, "João", "joao@email.com", "hashedPassword", Role.USER);
        when(accountRepository.findById(userId)).thenReturn(Optional.of(existingAccount));

        UpdateAccountCommand command = UpdateAccountCommand.builder()
                .id(userId)
                .nickname("João Atualizado")
                .password(null)
                .confirmPassword(null)
                .build();

        accountService.updateUser(command);

        assertThat(existingAccount.getNickname()).isEqualTo("João Atualizado");
        verify(accountRepository).findById(userId);
    }

    @Test
    @DisplayName("Deve atualizar senha com sucesso")
    void shouldUpdatePasswordSuccessfully() {

        Account existingAccount = new Account(userId, "João", "joao@email.com", "oldHashedPassword", Role.USER);
        when(accountRepository.findById(userId)).thenReturn(Optional.of(existingAccount));
        when(encoder.encode("NovaSenha@123")).thenReturn("newHashedPassword");

        UpdateAccountCommand command = UpdateAccountCommand.builder()
                .id(userId)
                .nickname(null)
                .password("NovaSenha@123")
                .confirmPassword("NovaSenha@123")
                .build();

        accountService.updateUser(command);

        assertThat(existingAccount.getPassword()).isEqualTo("newHashedPassword");
        verify(encoder).encode("NovaSenha@123");
    }

    @Test
    @DisplayName("Deve atualizar nickname e senha juntos")
    void shouldUpdateNicknameAndPasswordTogether() {

        Account existingAccount = new Account(userId, "João", "joao@email.com", "oldHashedPassword", Role.USER);
        when(accountRepository.findById(userId)).thenReturn(Optional.of(existingAccount));
        when(encoder.encode("NovaSenha@123")).thenReturn("newHashedPassword");

        UpdateAccountCommand command = UpdateAccountCommand.builder()
                .id(userId)
                .nickname("João Atualizado")
                .password("NovaSenha@123")
                .confirmPassword("NovaSenha@123")
                .build();

        accountService.updateUser(command);

        assertThat(existingAccount.getNickname()).isEqualTo("João Atualizado");
        assertThat(existingAccount.getPassword()).isEqualTo("newHashedPassword");
    }

    @Test
    @DisplayName("Deve lançar exceção quando nenhum dado for informado para atualização")
    void shouldThrowExceptionWhenNoDataToUpdate() {

        UpdateAccountCommand command = UpdateAccountCommand.builder()
                .id(userId)
                .nickname(null)
                .password(null)
                .confirmPassword(null)
                .build();

        assertThatThrownBy(() -> accountService.updateUser(command))
                .isInstanceOf(NoDataForUpdateException.class);

        verify(accountRepository, never()).findById(any());
    }

    @Test
    @DisplayName("Deve lançar exceção quando usuário não existe na atualização")
    void shouldThrowExceptionWhenUserNotFoundOnUpdate() {

        when(accountRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.updateUser(validUpdateCommand))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    @DisplayName("Deve lançar exceção quando senhas não conferem na atualização")
    void shouldThrowExceptionWhenPasswordsDontMatchOnUpdate() {

        Account existingAccount = new Account(userId, "João", "joao@email.com", "hashedPassword", Role.USER);
        when(accountRepository.findById(userId)).thenReturn(Optional.of(existingAccount));

        UpdateAccountCommand command = UpdateAccountCommand.builder()
                .id(userId)
                .nickname(null)
                .password("NovaSenha@123")
                .confirmPassword("SenhaDiferente@123")
                .build();

        assertThatThrownBy(() -> accountService.updateUser(command))
                .isInstanceOf(PasswordDontMatchException.class);

        verify(encoder, never()).encode(any());
    }

    @Test
    @DisplayName("Deve lançar exceção quando senha informada mas confirmação está vazia")
    void shouldThrowExceptionWhenPasswordProvidedButConfirmPasswordEmpty() {

        Account existingAccount = new Account(userId, "João", "joao@email.com", "hashedPassword", Role.USER);
        when(accountRepository.findById(userId)).thenReturn(Optional.of(existingAccount));

        UpdateAccountCommand command = UpdateAccountCommand.builder()
                .id(userId)
                .nickname(null)
                .password("NovaSenha@123")
                .confirmPassword(null)
                .build();

        assertThatThrownBy(() -> accountService.updateUser(command))
                .isInstanceOf(PasswordDontMatchException.class);
    }

    @Test
    @DisplayName("Deve ignorar campos vazios na atualização")
    void shouldIgnoreEmptyFieldsOnUpdate() {

        UpdateAccountCommand command = UpdateAccountCommand.builder()
                .id(userId)
                .nickname("")
                .password("")
                .confirmPassword("")
                .build();

        // Act & Assert
        assertThatThrownBy(() -> accountService.updateUser(command))
                .isInstanceOf(NoDataForUpdateException.class);

        // ✅ Verifica que findById NUNCA foi chamado
        verify(accountRepository, never()).findById(any());
    }


    @Test
    @DisplayName("Deve deletar usuário com sucesso")
    void shouldDeleteUserSuccessfully() {

        when(accountRepository.existsById(userId)).thenReturn(true);

        accountService.deleteUser(userId);

        verify(accountRepository).existsById(userId);
        verify(accountRepository).deleteById(userId);
    }

    @Test
    @DisplayName("Deve lançar exceção quando usuário não existe na deleção")
    void shouldThrowExceptionWhenUserNotFoundOnDelete() {

        when(accountRepository.existsById(userId)).thenReturn(false);

        assertThatThrownBy(() -> accountService.deleteUser(userId))
                .isInstanceOf(UserNotFoundException.class);

        verify(accountRepository, never()).deleteById(any());
    }


    @Test
    @DisplayName("Deve buscar usuário por ID com sucesso")
    void shouldGetUserByIdSuccessfully() {

        Account account = new Account(userId, "João", "joao@email.com", "hashedPassword", Role.USER);
        when(accountRepository.findById(userId)).thenReturn(Optional.of(account));

        Account result = accountService.getUserById(userId);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(userId);
        assertThat(result.getNickname()).isEqualTo("João");
        verify(accountRepository).findById(userId);
    }

    @Test
    @DisplayName("Deve lançar exceção quando usuário não existe na busca por ID")
    void shouldThrowExceptionWhenUserNotFoundOnGetById() {

        when(accountRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.getUserById(userId))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    @DisplayName("Deve buscar todos os usuários com filtros")
    void shouldGetAllUsersWithFilters() {

        Account user1 = new Account(UUID.randomUUID(), "João", "joao@email.com", "hash1", Role.USER);
        Account user2 = new Account(UUID.randomUUID(), "Maria", "maria@email.com", "hash2", Role.ADMIN);
        List<Account> accounts = List.of(user1, user2);

        AccountFilterQueryCommand command = AccountFilterQueryCommand.builder()
                .nickname("João")
                .email(null)
                .role(Role.USER)
                .build();

        when(accountRepository.findByFilters("João", null, Role.USER)).thenReturn(accounts);

        List<Account> result = accountService.getAllUsers(command);

        assertThat(result).hasSize(2);
        verify(accountRepository).findByFilters("João", null, Role.USER);
    }

    @Test
    @DisplayName("Deve buscar todos os usuários sem filtros")
    void shouldGetAllUsersWithoutFilters() {

        List<Account> accounts = List.of(
                new Account(UUID.randomUUID(), "João", "joao@email.com", "hash1", Role.USER),
                new Account(UUID.randomUUID(), "Maria", "maria@email.com", "hash2", Role.ADMIN)
        );

        AccountFilterQueryCommand command = AccountFilterQueryCommand.builder()
                .nickname(null)
                .email(null)
                .role(null)
                .build();

        when(accountRepository.findByFilters(null, null, null)).thenReturn(accounts);

        List<Account> result = accountService.getAllUsers(command);

        assertThat(result).hasSize(2);
        verify(accountRepository).findByFilters(null, null, null);
    }
}
