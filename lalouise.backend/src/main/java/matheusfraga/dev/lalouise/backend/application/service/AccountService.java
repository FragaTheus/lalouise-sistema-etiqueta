package matheusfraga.dev.lalouise.backend.application.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.command.account.AccountFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.application.command.account.CreateAccountCommand;
import matheusfraga.dev.lalouise.backend.application.command.account.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.exception.user.*;
import matheusfraga.dev.lalouise.backend.domain.repository.AccountRepository;
import org.springframework.data.domain.Page;
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
        if (accountRepository.existsByEmailIgnoreCaseAndIsActiveTrue(email)) {
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
        accountRepository.save(account);
    }

    @Transactional
    public void deactivateAccount(UUID id) {
        Account account = getUserById(id);
        account.deactivate();
        accountRepository.save(account);
    }

    @Transactional
    public void reactivateAccount(UUID id) {
        Account account = getUserById(id);
        account.reactivate();
        accountRepository.save(account);
    }

    public Account getUserById(UUID id) {
        return accountRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

    public Page<Account> getAllUsers(AccountFilterQueryCommand command) {
        return accountRepository.findByFilters(
                command.nickname(),
                command.email(),
                command.role(),
                command.pageable()
        );
    }

    public Account getUserByEmail(String email){
        return accountRepository.findByEmailAndIsActiveTrue(email).orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    public void recordLastLogin(String email){
        Account account = getUserByEmail(email);
        account.recordLastLogin();
        accountRepository.save(account);
    }

    public Page<Account> getDeletedAccountsByFilter(AccountFilterQueryCommand command) {
        return accountRepository.findDeletedByFilters(command.nickname(), command.email(), command.role(), command.pageable());
    }

}