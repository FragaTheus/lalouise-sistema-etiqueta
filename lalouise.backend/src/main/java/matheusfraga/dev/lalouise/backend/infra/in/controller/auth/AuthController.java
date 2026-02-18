package matheusfraga.dev.lalouise.backend.infra.in.controller.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.service.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
        var authResult = authService.authenticate(request.email(),  request.password());
        var token = authResult.token();
        var user = authResult.userDetails();

        ResponseCookie cookie = ResponseCookie.from("Jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(60*60)
                .sameSite("Lax")
                .build();

        var response = new LoginResponse(
                user.getId(),
                user.getNickname(),
                user.getRole()
        );
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(response);
    }

}
