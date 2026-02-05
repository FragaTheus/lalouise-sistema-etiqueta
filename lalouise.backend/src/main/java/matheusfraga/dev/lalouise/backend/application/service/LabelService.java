package matheusfraga.dev.lalouise.backend.application.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matheusfraga.dev.lalouise.backend.application.command.label.CreateLabelInputCommand;
import matheusfraga.dev.lalouise.backend.application.command.label.PageFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.exception.label.LabelNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.exception.sector.StorageTypeNotAllowedInSectorException;
import matheusfraga.dev.lalouise.backend.domain.repository.LabelRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;
    private final ProductService productService;
    private final AccountService accountService;
    private final SectorService sectorService;
    private final ValidityService validityService;

    @Transactional
    public Label createLabel(CreateLabelInputCommand command) {

        var product = productService.getProduct(command.productId());
        var sector = sectorService.getSector(command.sectorId());
        var responsible = accountService.getUserById(command.responsibleId());

        if (!sector.getStorages().contains(command.storageType())) throw new StorageTypeNotAllowedInSectorException();

        LocalDate today = LocalDate.now();
        var expirationDate = validityService.calculateExpirationDate(command.storageType(), today);

        var initialStatus = validityService.determineStatus(expirationDate);

        var issueDate = LocalDate.now();
        Label label = new Label(
                product, sector, responsible, issueDate, expirationDate, initialStatus
        );
        return labelRepository.save(label);
    }

    public Page<Label> findByFilters(PageFilterQueryCommand command) {
        return labelRepository.findByFilters(
                command.resId(),
                command.productName(),
                command.resName(),
                command.secName(),
                command.status(),
                command.pageable()
        );
    }

    @Transactional
    public void updateStatus(UUID id, LabelStatus newStatus) {
        Label label = labelRepository.findById(id)
                .orElseThrow(LabelNotFoundException::new);

        label.setStatus(newStatus);
    }

    public Label getLabel(UUID id) {
        return  labelRepository.findById(id)
                .orElseThrow(LabelNotFoundException::new);
    }

    @Transactional
    public void checkAndExpireLabels() {
        log.info("Iniciando Job de atualização de status de validades...");
        LocalDate today = LocalDate.now();
        LocalDate alertDate = today.plusDays(3);

        List<LabelStatus> statusParaVencer = List.of(LabelStatus.ATIVA, LabelStatus.A_VENCER);

        List<Label> expiredLabels = labelRepository.findAllByExpirationDateLessThanEqualAndStatusIn(
                today, statusParaVencer
        );

        if (!expiredLabels.isEmpty()) {
            expiredLabels.forEach(l -> l.setStatus(LabelStatus.VENCIDA));
            labelRepository.saveAll(expiredLabels);
            log.info("{} etiquetas alteradas para VENCIDA (Estavam em: {}).", expiredLabels.size(), statusParaVencer);
        }


        List<Label> attentionLabels = labelRepository.findAllByExpirationDateAndStatus(
                alertDate, LabelStatus.ATIVA
        );

        if (!attentionLabels.isEmpty()) {
            attentionLabels.forEach(l -> l.setStatus(LabelStatus.A_VENCER));
            labelRepository.saveAll(attentionLabels);
            log.info("{} etiquetas alteradas para A VENCER (Vencimento em: {}).", attentionLabels.size(), alertDate);
        }
    }

    @Transactional
    public void cleanOldLabels() {
        log.info("Iniciando limpeza automática de registros antigos (90 dias após o vencimento)...");

        LocalDate limitDate = LocalDate.now().minusDays(90);

        List<LabelStatus> statusParaLimpar = List.of(LabelStatus.VENCIDA, LabelStatus.DESCARTADA);

        int deletedCount = labelRepository.deleteOldLabelsByStatusIn(statusParaLimpar, limitDate);

        if (deletedCount > 0) {
            log.info("Limpeza concluída: {} etiquetas que venceram há mais de 90 dias foram removidas.", deletedCount);
        } else {
            log.info("Nenhuma etiqueta antiga para remover hoje.");
        }
    }

}
