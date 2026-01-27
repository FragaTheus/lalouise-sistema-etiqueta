package matheusfraga.dev.lalouise.backend.security;


import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class TokenServiceTest {

    @Autowired
    private TokenService tokenService;

    @Test
    @DisplayName("Deve gerar um token JWT válido para um usuário")
    void shouldGenerateTokenSuccessfully() {

        UserDetails user = org.springframework.security.core.userdetails.User.builder()
                .username("matheus@teste.com")
                .password("123456")
                .authorities(Collections.emptyList())
                .build();

        String token = tokenService.generateToken(user);

        assertThat(token).isNotNull();
        assertThat(token.split("\\.")).hasSize(3); // Um JWT sempre tem 3 partes separadas por ponto
    }

    @Test
    @DisplayName("Deve validar um token gerado corretamente e retornar o subject")
    void shouldValidateTokenAndReturnSubject() {

        String email = "valida@teste.com";
        UserDetails user = org.springframework.security.core.userdetails.User.builder()
                .username(email)
                .password("123456")
                .authorities(Collections.emptyList())
                .build();

        String token = tokenService.generateToken(user);

        String subject = tokenService.validateToken(token);

        assertThat(subject).isEqualTo(email);
    }

    @Test
    @DisplayName("Deve retornar null ao validar um token inválido ou malformado")
    void shouldReturnNullForInvalidToken() {

        String invalidToken = "token.totalmente.errado";

        String subject = tokenService.validateToken(invalidToken);

        assertThat(subject).isNull();
    }
}