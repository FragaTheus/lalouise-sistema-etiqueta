package matheusfraga.dev.lalouise.backend.vo;

import matheusfraga.dev.lalouise.backend.core.exception.DomainException;
import matheusfraga.dev.lalouise.backend.core.vo.UserPassword;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserPasswordVoTest {

    @Test
    @DisplayName("Deve criar UserPassword a partir de uma senha raw válida")
    void shouldCreateFromValidRawPassword() {
        String validRaw = "Senha@123";
        UserPassword password = UserPassword.fromRawPassword(validRaw);

        assertThat(password).isNotNull();
        assertThat(password.getValue()).isEqualTo(validRaw);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "short",
            "longpassword123@",
            "senhasemnumero@",
            "SENHASEMMINUSCULA1!",
            "senhasemmaiuscula1!",
            "SenhaSemEspecial1",
            "    "
    })
    @DisplayName("Deve lançar exceção para senhas raw que não seguem o padrão")
    void shouldThrowExceptionForInvalidRawPasswords(String invalidRaw) {
        assertThatThrownBy(() -> UserPassword.fromRawPassword(invalidRaw))
                .isInstanceOf(DomainException.class);
    }

    @Test
    @DisplayName("Deve criar UserPassword a partir de um hash BCrypt válido")
    void shouldCreateFromValidHash() {
        String validHash = "$2a$12$R9h/lIPz0bouIzCu6slgOKS7LeBnMh9Gj31I/yI.8vH7/P.T8/L5.";
        UserPassword password = UserPassword.fromHashPassword(validHash);

        assertThat(password).isNotNull();
        assertThat(password.getValue()).isEqualTo(validHash);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "123456",
            "$2a$12$curto",
            "sha256:4813494d137e1631bba301d5acab6e7b",
            ""
    })
    @DisplayName("Deve lançar exceção para hashes inválidos")
    void shouldThrowExceptionForInvalidHash(String invalidHash) {
        assertThatThrownBy(() -> UserPassword.fromHashPassword(invalidHash))
                .isInstanceOf(DomainException.class);
    }
}
