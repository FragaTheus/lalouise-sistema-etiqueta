package matheusfraga.dev.lalouise.backend.core.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.application.commands.CreateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.commands.UpdateUserInputCommand;
import matheusfraga.dev.lalouise.backend.core.application.commands.UserFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.exception.*;
import matheusfraga.dev.lalouise.backend.core.domain.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;

    //Metodos auxiliares
    private void passwordIsMatch(String password, String confirmPassword) {
        boolean passwordIsMatch = password.equals(confirmPassword);
        if(!passwordIsMatch) throw new PasswordDontMatchException();
    }

    private User registerUser(CreateUserInputCommand command, Role role){

        passwordIsMatch(command.password(), command.confirmPassword());

        boolean userAlreadyExists = userRepository.existsByEmailValue(command.email());
        if(userAlreadyExists) throw new EmailAlreadyExists();

        String hashedPassword = encoder.encode(command.password());
        User user = new User(command.nickname(), command.email(), hashedPassword, role);
        return userRepository.save(user);
    }

    //Metodos de caso de uso
    public User createUser(CreateUserInputCommand command){
        return registerUser(command, Role.USER);
    }

    public User createAdmin(CreateUserInputCommand command){
        return registerUser(command, Role.ADMIN);
    }

    @Transactional
    public User updateUser(UpdateUserInputCommand command){

        boolean hasNickname =  command.nickname() != null && !command.nickname().isEmpty();
        boolean hasPassword = command.password() != null && !command.password().isEmpty();
        if(!hasNickname && !hasPassword) throw new NoDataForUpdateException();

        User user = userRepository.findById(command.id()).orElseThrow(UserNotFoundException::new);
        if(hasNickname) user.setNickname(command.nickname());
        if(hasPassword){
            if(command.confirmPassword() == null || command.confirmPassword().isEmpty()){
                throw new PasswordDontMatchException();
            }
                passwordIsMatch(command.password(), command.confirmPassword());
                String hashedPassword = encoder.encode(command.password());
                user.setPassword(hashedPassword);
            }
        return userRepository.save(user);
        }


    @Transactional
    public void deleteUser(UUID id, String password){
        String loggedEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User admin = userRepository.findByEmailValue(loggedEmail).orElseThrow(UserNotFoundException::new);
        boolean isRightPassword = encoder.matches(password, admin.getPassword().password());
        if(!isRightPassword) throw new WrongPasswordException();
        userRepository.deleteById(id);
    }

    public User getUserById(UUID id){
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public List<User> getAllUsers(UserFilterQueryCommand command){
        return  userRepository.findByFilters(command.nickname(), command.email(), command.role());
    }

}
