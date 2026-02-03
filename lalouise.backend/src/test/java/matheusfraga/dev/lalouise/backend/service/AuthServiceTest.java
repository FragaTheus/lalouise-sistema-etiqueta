package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.application.service.AuthService;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenService tokenService;

    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("Deve realizar login e retornar token JWT com sucesso")
    void shouldLoginAndReturnToken() {
        String email = "admin@lalouise.com";
        String password = "Password123!";
        String expectedToken = "mocked-jwt-token";

        var userDetails = mock(UserDetailsImpl.class);
        var authentication = mock(Authentication.class);

        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(tokenService.generateToken(userDetails)).thenReturn(expectedToken);

        String resultToken = authService.login(email, password);

        assertNotNull(resultToken);
        assertEquals(expectedToken, resultToken);

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(tokenService).generateToken(userDetails);
    }

    @Test
    @DisplayName("Deve lançar exceção quando as credenciais estiverem incorretas")
    void shouldThrowExceptionWhenCredentialsAreInvalid() {
        String email = "errado@email.com";
        String password = "senha";

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        assertThrows(BadCredentialsException.class, () -> authService.login(email, password));

        verifyNoInteractions(tokenService);
    }
}
