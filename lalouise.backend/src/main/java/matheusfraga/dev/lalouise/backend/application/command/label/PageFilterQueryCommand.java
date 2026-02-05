package matheusfraga.dev.lalouise.backend.application.command.label;

import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public record PageFilterQueryCommand(
        UUID resId,
        String productName,
        String resName,
        String secName,
        LabelStatus status,
        Pageable pageable
) {
}
