package matheusfraga.dev.lalouise.backend.application.service;

import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Map;

@Service
public class ValidityService {

    private static final Map<StorageType, Integer> EXPIRATION_DEADLINES = Map.of(
            StorageType.AMBIENTE, 1,
            StorageType.REFRIGERADO, 3,
            StorageType.CONGELADO, 30,
            StorageType.HIPER_CONGELADO, 90
    );

    private static final int ALERT_DAYS = 3;

    public LocalDate calculateExpirationDate(StorageType storageType, LocalDate manufacturingDate) {
        if (storageType == null) {
            throw new IllegalArgumentException("Invalid storage type: null");
        }

        Integer deadline = EXPIRATION_DEADLINES.get(storageType);

        if (deadline == null) {
            throw new IllegalArgumentException("Invalid storage type: " + storageType);
        }
        return manufacturingDate.plusDays(deadline);
    }

    public LabelStatus determineStatus(LocalDate expirationDate) {
        long remainingDays = ChronoUnit.DAYS.between(LocalDate.now(), expirationDate);

        if (remainingDays < 0) {
            return LabelStatus.VENCIDA;
        }
        if (remainingDays <= ALERT_DAYS) {
            return LabelStatus.A_VENCER;
        }
        return LabelStatus.ATIVA;
    }
}