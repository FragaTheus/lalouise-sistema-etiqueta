package matheusfraga.dev.lalouise.backend.core.vo;

import lombok.Value;
import matheusfraga.dev.lalouise.backend.core.exception.DomainException;

import java.util.regex.Pattern;

@Value
public class UserPassword {

    private static final String RAW_PASSWORD_REGEX =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$";

    private static final String HASH_PASSWORD_REGEX =
            "^\\$2[ayb]\\$[0-9]{2}\\$[./A-Za-z0-9]{53}$";

    private static final Pattern RAW_PASSWORD_PATTERN = Pattern.compile(RAW_PASSWORD_REGEX);
    private static final Pattern HASH_PASSWORD_PATTERN = Pattern.compile(HASH_PASSWORD_REGEX);

    String value;

    private UserPassword(String value) {
        this.value = value;
    }

    public static UserPassword fromRawPassword(String value) {
        if (value == null || value.isBlank()) throw new DomainException("Password cannot be null or blank");
        if (!RAW_PASSWORD_PATTERN.matcher(value).matches()) throw new DomainException("Password is not valid");

        return new UserPassword(value);
    }

    public static UserPassword fromHashPassword(String hashPassword) {
        if (!HASH_PASSWORD_PATTERN.matcher(hashPassword).matches()) throw new DomainException("Password is not valid");
        return new UserPassword(hashPassword);
    }

}
