package matheusfraga.dev.lalouise.backend.security;

import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER")))
                .build();

        String token = tokenService.generateToken(user);

        assertThat(token).isNotNull();
        assertThat(token.split("\\.")).hasSize(3);
    }

    @Test
    @DisplayName("Deve validar um token gerado corretamente e retornar o subject")
    void shouldValidateTokenAndReturnSubject() {

        String email = "valida@teste.com";
        UserDetails user = org.springframework.security.core.userdetails.User.builder()
                .username(email)
                .password("123456")
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))) // ✅ COM role
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

    @Test
    @DisplayName("Deve lançar exceção ao tentar gerar token sem authorities")
    void shouldThrowExceptionWhenGeneratingTokenWithoutAuthorities() {

        UserDetails user = org.springframework.security.core.userdetails.User.builder()
                .username("semrole@teste.com")
                .password("123456")
                .authorities(List.of())
                .build();

        assertThatThrownBy(() -> tokenService.generateToken(user))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Usuário sem role");
    }

    @Test
    @DisplayName("Deve retornar null para token expirado")
    void shouldReturnNullForExpiredToken() {
        String expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsYWxvdWlzZS1hcGkiLCJzdWIiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjA5NDU5MjAwfQ.xyz";

        String subject = tokenService.validateToken(expiredToken);

        assertThat(subject).isNull();
    }

    @Test
    @DisplayName("Deve incluir role no token gerado")
    void shouldIncludeRoleInGeneratedToken() {
        UserDetails user = org.springframework.security.core.userdetails.User.builder()
                .username("admin@teste.com")
                .password("123456")
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .build();

        String token = tokenService.generateToken(user);

        assertThat(token).isNotNull();

        String subject = tokenService.validateToken(token);
        assertThat(subject).isEqualTo("admin@teste.com");
    }
}