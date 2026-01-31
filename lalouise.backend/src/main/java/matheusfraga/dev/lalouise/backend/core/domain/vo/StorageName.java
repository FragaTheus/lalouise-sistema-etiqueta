package matheusfraga.dev.lalouise.backend.core.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import matheusfraga.dev.lalouise.backend.core.domain.exception.DomainException;

import java.util.regex.Pattern;

@Embeddable
public record StorageName(

        @Column(name = "name",  nullable = false)
        String value
) {

    private static final String SECTOR_NAME_REGEX = "^[a-zA-Z0-9À-ÿ ]+$";
    private static final Pattern SECTOR_NAME_PATTERN = Pattern.compile(SECTOR_NAME_REGEX);

    public StorageName{
        if (value == null || value.isEmpty()) throw new DomainException("Nome do armazenamento nulo ou vazio");

        value = value.trim().toLowerCase();

        if (value.length() < 3 || value.length() > 30) {
            throw new DomainException("O nome do armazenamento deve ter entre 3 e 30 caracteres");
        }

        if (!SECTOR_NAME_PATTERN.matcher(value).matches()) throw new DomainException("Nome do armazenamento invalido");

    }

}
