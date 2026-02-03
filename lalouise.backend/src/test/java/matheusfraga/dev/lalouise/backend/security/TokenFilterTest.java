package matheusfraga.dev.lalouise.backend.security;

import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.repository.AccountRepository;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TokenFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountRepository accountRepository;

    @Test
    @DisplayName("Deve permitir acesso quando o token for válido")
    void shouldAllowAccessWithValidToken() throws Exception {

        var user = new Account("Filtro", "filtro@teste.com", "$2a$12$R9h/lIPz0bouIzCu6slgOKS7LeBnMh9Gj31I/yI.8vH7/P.T8/L5.", Role.ADMIN);
        accountRepository.save(user);

        String token = tokenService.generateToken(new UserDetailsImpl(user));

        mockMvc.perform(get("/api/v1/accounts")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Deve barrar acesso (403) quando não houver token")
    void shouldDenyAccessWithoutToken() throws Exception {
        mockMvc.perform(get("/api/v1/accounts"))
                .andExpect(status().isForbidden());
    }
}
