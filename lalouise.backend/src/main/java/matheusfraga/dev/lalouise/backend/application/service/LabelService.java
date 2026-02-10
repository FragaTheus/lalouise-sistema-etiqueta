package matheusfraga.dev.lalouise.backend.application.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matheusfraga.dev.lalouise.backend.application.command.label.PageFilterQueryCommand;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.exception.label.LabelAlreadyDiscardedException;
import matheusfraga.dev.lalouise.backend.domain.exception.label.LabelNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.exception.sector.StorageTypeNotAllowedInSectorException;
import matheusfraga.dev.lalouise.backend.domain.repository.LabelRepository;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final SectorService sectorService;
    private final ValidityService validityService;
    private final AccountService accountService;
    private final PrintJobService printJobService;

    @Transactional
    public Label createLabel(UUID productId, StorageType storage) {

        Account responsible = getResponsible();

        Sector sector = sectorService.getSectorByResponsible(responsible.getId());

        var product = productService.getProduct(productId);
        if (!sector.getStorages().contains(storage)) throw new StorageTypeNotAllowedInSectorException();

        LocalDate today = LocalDate.now();
        var expirationDate = validityService.calculateExpirationDate(storage, today);
        var initialStatus = validityService.determineStatus(expirationDate);

        Label label = new Label(
                product, sector, responsible, today, expirationDate, initialStatus
        );
        Label savedLabel = labelRepository.save(label);


        return savedLabel;
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
    public Label updateLabelStatus(UUID oldLabelId, StorageType storage) {

        Label oldLabel = labelRepository.findById(oldLabelId)
                .orElseThrow(LabelNotFoundException::new);

        if (oldLabel.getStatus() == LabelStatus.DESCARTADA) throw new LabelAlreadyDiscardedException();
        oldLabel.setStatus(LabelStatus.DESCARTADA);

        var productId = oldLabel.getProduct().getId();

        return createLabel(productId, storage );
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

    //Métodos auxiliares
    private Account getResponsible(){
        String accountEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return accountService.getUserByEmail(accountEmail);
    }

}
