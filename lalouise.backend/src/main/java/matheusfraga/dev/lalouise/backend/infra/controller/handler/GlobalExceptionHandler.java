package matheusfraga.dev.lalouise.backend.infra.controller.handler;

import matheusfraga.dev.lalouise.backend.domain.exception.sector.*;
import matheusfraga.dev.lalouise.backend.domain.exception.user.*;
import org.apache.coyote.Response;
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
        var message = "Email ou senha inválidos, tente novamente.";
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

    @ExceptionHandler(EmailAlreadyExists.class)
    public ResponseEntity<HandlerResponse<Void>> handleEmailAlreadyExists(EmailAlreadyExists ex){
        var response = HandlerResponse.withoutData(HttpStatus.CONFLICT.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(NoDataForUpdateException.class)
    public ResponseEntity<HandlerResponse<Void>> handleNoDataForUpdate(NoDataForUpdateException ex){
        var response = HandlerResponse.withoutData(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(PasswordDontMatchException.class)
    public ResponseEntity<HandlerResponse<Void>> handlePasswordDontMatchException(PasswordDontMatchException ex){
        var response = HandlerResponse.withoutData(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<HandlerResponse<Void>> handlerResponseResponseEntity(UserNotFoundException ex){
        var response = HandlerResponse.withoutData(HttpStatus.NOT_FOUND.value(),ex.getMessage());
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(WrongPasswordException.class)
    public ResponseEntity<HandlerResponse<Void>> handleWrongPasswordException(WrongPasswordException ex){
        var response = HandlerResponse.withoutData(HttpStatus.UNAUTHORIZED.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(SectorAlreadyExistsException.class)
    public ResponseEntity<HandlerResponse<Void>> handleSectorAlreadyExistsException(SectorAlreadyExistsException ex){
        var response = HandlerResponse.withoutData(HttpStatus.CONFLICT.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(SectorNotFoundException.class)
    public ResponseEntity<HandlerResponse<Void>> handleSectorNotFoundException(SectorNotFoundException ex){
        var response = HandlerResponse.withoutData(HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(SameSectorNameException.class)
    public ResponseEntity<HandlerResponse<Void>> handleSameSectorNameException(SameSectorNameException ex){
        var response = HandlerResponse.withoutData(HttpStatus.CONFLICT.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(UserAlreadyHasSectorException.class)
    public ResponseEntity<HandlerResponse<Void>> handleUserAlreadyHasSectorException(UserAlreadyHasSectorException ex){
        var response = HandlerResponse.withoutData(HttpStatus.CONFLICT.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(SameResponsibleException.class)
    public ResponseEntity<HandlerResponse<Void>> handleSameResponsibleException(SameResponsibleException ex){
        var response = HandlerResponse.withoutData(HttpStatus.CONFLICT.value(), ex.getMessage());
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
}
