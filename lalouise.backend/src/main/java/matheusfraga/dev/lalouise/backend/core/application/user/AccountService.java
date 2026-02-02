package matheusfraga.dev.lalouise.backend.core.application.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.application.user.command.CreateAccountCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.UpdateAccountCommand;
import matheusfraga.dev.lalouise.backend.core.application.user.command.AccountFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.exception.user.*;
import matheusfraga.dev.lalouise.backend.core.domain.repository.AccountRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final BCryptPasswordEncoder encoder;
    private final AccountRepository accountRepository;

    //Metodos auxiliares
    private void passwordIsMatch(String password, String confirmPassword) {
        boolean passwordIsMatch = password.equals(confirmPassword);
        if(!passwordIsMatch) throw new PasswordDontMatchException();
    }

    private Account registerUser(CreateAccountCommand command, Role role){

        passwordIsMatch(command.password(), command.confirmPassword());

        boolean userAlreadyExists = accountRepository.existsByEmailIgnoreCase(command.email());
        if(userAlreadyExists) throw new EmailAlreadyExists();

        String hashedPassword = encoder.encode(command.password());
        Account account = new Account(command.nickname(), command.email(), hashedPassword, role);
        return accountRepository.save(account);
    }

    //Metodos de caso de uso
    public Account createUser(CreateAccountCommand command){
        return registerUser(command, Role.USER);
    }

    public Account createAdmin(CreateAccountCommand command){
        return registerUser(command, Role.ADMIN);
    }

    @Transactional
    public Account updateUser(UpdateAccountCommand command){

        boolean hasNickname =  command.nickname() != null && !command.nickname().isEmpty();
        boolean hasPassword = command.password() != null && !command.password().isEmpty();
        if(!hasNickname && !hasPassword) throw new NoDataForUpdateException();

        Account account = accountRepository.findById(command.id()).orElseThrow(UserNotFoundException::new);
        if(hasNickname) account.setNickname(command.nickname());
        if(hasPassword){
            if(command.confirmPassword() == null || command.confirmPassword().isEmpty()){
                throw new PasswordDontMatchException();
            }
                passwordIsMatch(command.password(), command.confirmPassword());
                String hashedPassword = encoder.encode(command.password());
                account.setPassword(hashedPassword);
            }
        return accountRepository.save(account);
        }


    @Transactional
    public void deleteUser(UUID id, String password){
        String loggedEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Account admin = accountRepository.findByEmailIgnoreCase(loggedEmail).orElseThrow(UserNotFoundException::new);
        boolean isRightPassword = encoder.matches(password, admin.getPassword());
        if(!isRightPassword) throw new WrongPasswordException();
        accountRepository.deleteById(id);
    }

    public Account getUserById(UUID id){
        return accountRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public List<Account> getAllUsers(AccountFilterQueryCommand command){
        return  accountRepository.findByFilters(command.nickname(), command.email(), command.role());
    }

}
