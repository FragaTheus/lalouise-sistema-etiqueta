package matheusfraga.dev.lalouise.backend.vo;

import matheusfraga.dev.lalouise.backend.core.domain.exception.DomainException;
import matheusfraga.dev.lalouise.backend.core.domain.vo.UserEmail;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserEmailVoTest {

    @ParameterizedTest
    @ValueSource(strings = {
            "contato@lalouise.com",
            "suporte.tecnico@empresa.com.br",
            "dev_123@gmail.io"
    })
    @DisplayName("Deve criar UserEmail com sucesso para endereços válidos")
    void shouldCreateUserEmailWhenAddressIsValid(String validEmail) {
        var email = new UserEmail(validEmail);

        assertThat(email.value()).isEqualTo(validEmail.trim());
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "email_sem_arroba.com",
            "usuario@dominio",
            "usuario@dominio.",
            "usuario@dominio.c",
            "   ",
            "plainaddress"
    })
    @DisplayName("Deve lançar DomainException para endereços de e-mail inválidos")
    void shouldThrowExceptionWhenAddressIsInvalid(String invalidEmail) {
        assertThatThrownBy(() -> new UserEmail(invalidEmail))
                .isInstanceOf(DomainException.class);

    }
}
