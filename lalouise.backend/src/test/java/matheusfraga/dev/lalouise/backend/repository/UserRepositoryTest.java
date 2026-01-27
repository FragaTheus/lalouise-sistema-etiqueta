package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.repository.UserRepository;
import matheusfraga.dev.lalouise.backend.core.domain.vo.UserPassword;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("Deve encontrar usuários pelo valor do Nickname")
    void findAllByNicknameValueSuccess() {

        String nickname = "Louise";
        createUser("louise@teste.com", nickname, Role.USER);

        List<User> result = userRepository.findAllByNicknameValue(nickname);

        assertThat(result).isNotEmpty();
        assertThat(result.getFirst().getNickname().value()).isEqualTo(nickname);
    }

    @Test
    @DisplayName("Deve encontrar usuário pelo valor do Email")
    void findByEmailValueSuccess() {

        String email = "find@me.com";
        createUser(email, "Unique", Role.ADMIN);

        Optional<User> result = userRepository.findByEmailValue(email);

        assertThat(result).isPresent();
        assertThat(result.get().getEmail().value()).isEqualTo(email);
    }

    @Test
    @DisplayName("Deve retornar true quando o email já existir")
    void existsByEmailValueTrue() {

        String email = "exists@teste.com";
        createUser(email, "Exists", Role.USER);

        boolean exists = userRepository.existsByEmailValue(email);

        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("Deve listar todos os usuários por Role")
    void findAllByRoleSuccess() {

        createUser("admin@la.com", "AdminUser", Role.ADMIN);
        createUser("user@la.com", "CommonUser", Role.USER);

        List<User> admins = userRepository.findAllByRole(Role.ADMIN);

        assertThat(admins).hasSize(1);
        assertThat(admins.getFirst().getRole()).isEqualTo(Role.ADMIN);
    }

    private void createUser(String email, String nickname, Role role) {
        var password = UserPassword.fromRawPassword("Senha@123");

        User user = new User(
                nickname,
                email,
                password,
                role
        );
        userRepository.save(user);
    }
}
