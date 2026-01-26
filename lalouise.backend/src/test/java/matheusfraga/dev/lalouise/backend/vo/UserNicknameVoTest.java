package matheusfraga.dev.lalouise.backend.vo;

import matheusfraga.dev.lalouise.backend.core.exception.DomainException;
import matheusfraga.dev.lalouise.backend.core.vo.UserNickname;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserNicknameVoTest {

    @Test
    @DisplayName("Deve criar nickname válido e aplicar trim")
    void shouldCreateValidNicknameWithTrim() {

        var nickname = new UserNickname("  Matheus Fraga  ");

        assertThat(nickname.value()).isEqualTo("Matheus Fraga");
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "ab",
            "Nome Muito Longo Que Passa De Vinte",
            "User123",
            "User.Name",
            "   ",
    })
    @DisplayName("Deve lançar DomainException para nicknames fora do padrão")
    void shouldThrowExceptionForInvalidNicknames(String invalidName) {
        assertThatThrownBy(() -> new UserNickname(invalidName))
                .isInstanceOf(DomainException.class);
    }
}
