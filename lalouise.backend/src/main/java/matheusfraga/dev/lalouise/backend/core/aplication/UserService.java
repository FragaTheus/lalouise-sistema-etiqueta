package matheusfraga.dev.lalouise.backend.core.aplication;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;

    private void passwordIsMatch(String password, String confirmPassword) {
        boolean passwordIsMatch = password.equals(confirmPassword);
        if(!passwordIsMatch) throw new RuntimeException("Passwords do not match");
    }

    private User registerUser(CreateUserInputCommand command, Role role){

        passwordIsMatch(command.password(), command.confirmPassword());

        boolean userAlreadyExists = userRepository.existsByEmailValue(command.email());
        if(userAlreadyExists) throw new RuntimeException("User already exists");

        String hashedPassword = encoder.encode(command.password());
        User user = new User(command.nickname(), command.email(), hashedPassword, role);
        return userRepository.save(user);
    }

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

        if(!hasNickname && !hasPassword) throw new RuntimeException("Nickname and passwords is null match");

        User user = userRepository.findById(command.id()).orElseThrow(RuntimeException::new);
        if(hasNickname) user.setNickname(command.nickname());
        if(hasPassword){
            if(command.confirmPassword() != null && !command.confirmPassword().isEmpty()){
                passwordIsMatch(command.password(), command.confirmPassword());
                String hashedPassword = encoder.encode(command.password());
                user.setPassword(hashedPassword);
            }

        }
        return userRepository.save(user);
    }

}
