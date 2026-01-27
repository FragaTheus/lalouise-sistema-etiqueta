package matheusfraga.dev.lalouise.backend.infra.controller.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<HandlerResponse<Void>> handleBadCredentialsException(BadCredentialsException ex){
        var message = "Email ou senha invalidos, tente novamente.";
        var response = HandlerResponse.withoutData(HttpStatus.UNAUTHORIZED.value(), message);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<HandlerResponse<Map<String, String>>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        var response = new HandlerResponse<>(
                HttpStatus.BAD_REQUEST.value(),
                "Erro de validação nos campos: ",
                errors
        );

        return ResponseEntity.badRequest().body(response);
    }

}
