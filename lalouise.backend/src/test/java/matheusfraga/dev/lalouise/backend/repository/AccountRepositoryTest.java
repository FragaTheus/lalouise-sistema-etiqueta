package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.repository.AccountRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class AccountRepositoryTest {

    @Autowired
    private AccountRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    @DisplayName("Deve encontrar conta por email ignorando case")
    void shouldFindByEmailIgnoreCase() {
        var account = new Account("Matheus", "TESTE@email.com", "senha", Role.ADMIN);
        entityManager.persist(account);

        var result = repository.findByEmailIgnoreCase("teste@email.com");

        assertThat(result).isPresent();
        assertThat(result.get().getEmail()).isEqualTo("TESTE@email.com");
    }

    @Test
    @DisplayName("Deve filtrar contas por nickname e role corretamente")
    void shouldFilterByNicknameAndRole() {
        var acc1 = new Account("Matheus Fraga", "m1@test.com", "123", Role.ADMIN);
        var acc2 = new Account("João Silva", "j1@test.com", "123", Role.USER);
        entityManager.persist(acc1);
        entityManager.persist(acc2);

        var result = repository.findByFilters("math", null, Role.ADMIN);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNickname()).isEqualTo("Matheus Fraga");
    }
}
