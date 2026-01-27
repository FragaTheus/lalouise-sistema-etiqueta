package matheusfraga.dev.lalouise.backend.core.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import matheusfraga.dev.lalouise.backend.core.domain.exception.DomainException;

import java.util.regex.Pattern;

@Embeddable
public record UserEmail(
        @Column(name = "email", nullable = false, unique = true)
        String value
) {

    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    public UserEmail{
        if (value == null || value.isBlank()) throw new DomainException("Value cant be null or blank");

        value = value.trim().toLowerCase();

        if (!EMAIL_PATTERN.matcher(value).matches()) throw new DomainException("Invalid email address");
    }

}
