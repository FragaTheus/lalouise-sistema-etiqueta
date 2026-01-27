package matheusfraga.dev.lalouise.backend.core.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import matheusfraga.dev.lalouise.backend.core.exception.DomainException;

import java.util.regex.Pattern;

@Embeddable
public record UserNickname(
        @Column(name = "nickname",  nullable = false)
        String value
) {

    private static final String NICKNAME_REGEX = "^[\\p{L}\\s]{3,20}$";
    private static final Pattern NICKNAME_PATTERN = Pattern.compile(NICKNAME_REGEX);

    public UserNickname{
        if (value == null || value.isBlank()) throw new DomainException("Nickname cannot be null or blank");

        value = value.trim();

        if (!NICKNAME_PATTERN.matcher(value).matches()) throw new DomainException("Nickname is not valid");

    }

}
