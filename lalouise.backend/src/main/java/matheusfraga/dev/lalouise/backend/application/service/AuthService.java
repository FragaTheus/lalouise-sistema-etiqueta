package matheusfraga.dev.lalouise.backend.application.service;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.command.auth.AuthResult;
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

    public AuthResult authenticate(String email, String password) {
        var authToken =
                new UsernamePasswordAuthenticationToken(email, password);
        var auth =  authenticationManager.authenticate(authToken);
        var user = (UserDetailsImpl) auth.getPrincipal();
        var token = tokenService.generateToken(user);

        return new AuthResult(token, user);

    }

}
