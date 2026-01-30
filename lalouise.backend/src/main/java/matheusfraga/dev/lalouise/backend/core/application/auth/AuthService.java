package matheusfraga.dev.lalouise.backend.core.application.auth;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public String login(String email, String password) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(email, password);
        var auth = this.authenticationManager.authenticate(usernamePassword);
        return tokenService.generateToken((UserDetailsImpl) auth.getPrincipal());

    }

}
