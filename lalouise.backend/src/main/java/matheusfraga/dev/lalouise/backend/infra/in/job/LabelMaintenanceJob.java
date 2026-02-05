package matheusfraga.dev.lalouise.backend.infra.in.job;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matheusfraga.dev.lalouise.backend.application.service.LabelService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class LabelMaintenanceJob {

    private final LabelService labelService;

    @Scheduled(cron = "0 0 2 * * *", zone = "America/Sao_Paulo")
    public void updateLabelsStatus() {
        log.info("Iniciando Job de atualização de status de validade...");
        try {
            labelService.checkAndExpireLabels();
            log.info("Status das etiquetas atualizados com sucesso.");
        } catch (Exception e) {
            log.error("Erro ao atualizar status das etiquetas: {}", e.getMessage());
        }
    }

    @Scheduled(cron = "0 0 3 * * *", zone = "America/Sao_Paulo")
    public void cleanupOldLabels() {
        log.info("Iniciando Job de limpeza de etiquetas antigas (90 dias)...");
        try {
            labelService.cleanOldLabels();
            log.info("Limpeza de base finalizada com sucesso.");
        } catch (Exception e) {
            log.error("Erro ao limpar base de etiquetas: {}", e.getMessage());
        }
    }
}