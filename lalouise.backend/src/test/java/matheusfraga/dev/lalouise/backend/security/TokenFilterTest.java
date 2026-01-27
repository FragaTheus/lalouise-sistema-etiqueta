package matheusfraga.dev.lalouise.backend.security;

import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.repository.UserRepository;
import matheusfraga.dev.lalouise.backend.core.domain.vo.UserPassword;
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
    private UserRepository userRepository;

    @Test
    @DisplayName("Deve permitir acesso quando o token for válido")
    void shouldAllowAccessWithValidToken() throws Exception {

        var user = new User("Filtro", "filtro@teste.com", UserPassword.fromRawPassword("Senha@123"), Role.USER);
        userRepository.save(user);

        String token = tokenService.generateToken(new UserDetailsImpl(user));

        mockMvc.perform(get("/api/v1/users")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Deve barrar acesso (403) quando não houver token")
    void shouldDenyAccessWithoutToken() throws Exception {
        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isForbidden());
    }
}
