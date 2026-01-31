package matheusfraga.dev.lalouise.backend.core.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import matheusfraga.dev.lalouise.backend.core.domain.exception.DomainException;

import java.util.regex.Pattern;

@Embeddable
public record UserPassword(

        @Column(name = "password",  nullable = false)
        String value
) {

    private static final String RAW_PASSWORD_REGEX =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$";

    private static final String HASH_PASSWORD_REGEX =
            "^\\$2[ayb]\\$[0-9]{2}\\$[./A-Za-z0-9]{53}$";

    private static final Pattern RAW_PASSWORD_PATTERN = Pattern.compile(RAW_PASSWORD_REGEX);
    private static final Pattern HASH_PASSWORD_PATTERN = Pattern.compile(HASH_PASSWORD_REGEX);

    public UserPassword{
        if (!HASH_PASSWORD_PATTERN.matcher(value).matches()) throw new DomainException("Password is not valid");
    }

    @Override
    public String toString() {
        return "********";
    }
}
