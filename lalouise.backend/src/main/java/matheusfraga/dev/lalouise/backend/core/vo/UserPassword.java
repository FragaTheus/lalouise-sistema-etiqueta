package matheusfraga.dev.lalouise.backend.core.vo;

import java.util.regex.Pattern;

public class UserPassword {

    private static final String RAW_PASSWORD_REGEX =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,12}$";

    private static final String HASH_PASSWORD_REGEX =
            "^\\$2[ayb]\\$[0-9]{2}\\$[./A-Za-z0-9]{53}$";

    private static final Pattern RAW_PASSWORD_PATTERN = Pattern.compile(RAW_PASSWORD_REGEX);
    private static final Pattern HASH_PASSWORD_PATTERN = Pattern.compile(HASH_PASSWORD_REGEX);

    private final String value;

    private UserPassword(String value) {
        this.value = value;
    }

    public static UserPassword fromRawPassword(String value) {
        if (value == null || value.isBlank()) throw new IllegalArgumentException();
        if (!RAW_PASSWORD_PATTERN.matcher(value).matches()) throw new IllegalArgumentException();

        return new UserPassword(value);
    }

    public static UserPassword fromHashPassword(String hashPassword) {
        if (!HASH_PASSWORD_PATTERN.matcher(hashPassword).matches()) throw new IllegalArgumentException();
        return new UserPassword(hashPassword);
    }

    public String getValue() {
        return value;
    }
}
