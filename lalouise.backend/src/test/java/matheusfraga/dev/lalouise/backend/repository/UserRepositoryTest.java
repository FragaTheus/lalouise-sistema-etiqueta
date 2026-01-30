package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.repository.UserRepository;
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
    @DisplayName("Deve encontrar usuário pelo valor do Email")
    void findByEmailValueSuccess() {

        String email = "find@me.com";
        createUser(email, "Unique", Role.ADMIN);

        Optional<User> result = userRepository.findByEmailValueIgnoreCase(email);

        assertThat(result).isPresent();
        assertThat(result.get().getEmail().value()).isEqualTo(email);
    }

    @Test
    @DisplayName("Deve retornar true quando o email já existir")
    void existsByEmailValueTrue() {

        String email = "exists@teste.com";
        createUser(email, "Exists", Role.USER);

        boolean exists = userRepository.existsByEmailValueIgnoreCase(email);

        assertThat(exists).isTrue();
    }

    private void createUser(String email, String nickname, Role role) {
        var password = "$2a$12$R9h/lIPz0bouIzCu6slgOKS7LeBnMh9Gj31I/yI.8vH7/P.T8/L5.";

        User user = new User(
                nickname,
                email,
                password,
                role
        );
        userRepository.save(user);
    }
}
