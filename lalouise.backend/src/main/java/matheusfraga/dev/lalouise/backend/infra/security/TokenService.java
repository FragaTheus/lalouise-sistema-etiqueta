package matheusfraga.dev.lalouise.backend.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    private Instant genExpiration() {
        return Instant.now().plus(Duration.ofDays(7));
    }

    private Algorithm algorithm() {
        return Algorithm.HMAC256(secret);
    }

    public String generateToken(UserDetails user) {
        try {
            var authorities = user.getAuthorities();

            // ✅ VALIDAÇÃO ADICIONADA
            if (authorities == null || authorities.isEmpty()) {
                throw new IllegalStateException("Usuário sem role");
            }

            String role = authorities.iterator().next().getAuthority(); // ✅ Mudado para .getAuthority()

            return JWT.create()
                    .withIssuer("lalouise-api")
                    .withSubject(user.getUsername())
                    .withClaim("role", role)
                    .withExpiresAt(genExpiration())
                    .sign(algorithm());
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token", e);
        }
    }

    public String validateToken(String token) {
        try {
            return JWT.require(algorithm())
                    .withIssuer("lalouise-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }
}