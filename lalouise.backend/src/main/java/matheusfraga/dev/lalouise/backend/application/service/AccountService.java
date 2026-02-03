package matheusfraga.dev.lalouise.backend.application.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.command.AccountFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.application.command.CreateAccountCommand;
import matheusfraga.dev.lalouise.backend.application.command.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.exception.user.*;
import matheusfraga.dev.lalouise.backend.domain.repository.AccountRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final BCryptPasswordEncoder encoder;
    private final AccountRepository accountRepository;

    private boolean isPresent(String value) {
        return value != null && !value.isBlank();
    }

    private void ensurePasswordsMatch(String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            throw new PasswordDontMatchException();
        }
    }

    private void ensureEmailUnique(String email) {
        if (accountRepository.existsByEmailIgnoreCase(email)) {
            throw new EmailAlreadyExists();
        }
    }

    private void registerUser(CreateAccountCommand command, Role role) {
        ensurePasswordsMatch(command.password(), command.confirmPassword());
        ensureEmailUnique(command.email());

        String hashedPassword = encoder.encode(command.password());
        Account account = new Account(command.nickname(), command.email(), hashedPassword, role);

        accountRepository.save(account);
    }

    @Transactional
    public void createUser(CreateAccountCommand command) {
        registerUser(command, Role.USER);
    }

    @Transactional
    public void createAdmin(CreateAccountCommand command) {
        registerUser(command, Role.ADMIN);
    }

    @Transactional
    public void updateUser(UpdateAccountCommand command) {
        boolean hasNickname = isPresent(command.nickname());
        boolean hasPassword = isPresent(command.password());

        if (!hasNickname && !hasPassword) {
            throw new NoDataForUpdateException();
        }

        Account account = getUserById(command.id());

        if (hasNickname) {
            account.setNickname(command.nickname());
        }

        if (hasPassword) {
            if (!isPresent(command.confirmPassword())) {
                throw new PasswordDontMatchException();
            }
            ensurePasswordsMatch(command.password(), command.confirmPassword());
            account.setPassword(encoder.encode(command.password()));
        }
    }

    @Transactional
    public void deleteUser(UUID id) {
        if (!accountRepository.existsById(id)) {
            throw new UserNotFoundException();
        }
        accountRepository.deleteById(id);
    }

    public Account getUserById(UUID id) {
        return accountRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

    public List<Account> getAllUsers(AccountFilterQueryCommand command) {
        return accountRepository.findByFilters(
                command.nickname(),
                command.email(),
                command.role()
        );
    }
}