package matheusfraga.dev.lalouise.backend.application.command.printjob;

import lombok.Builder;

import java.util.UUID;

@Builder
public record PrintMessageCommand(
        UUID jobId,
        String zpl,
        Integer copies
) {
}
