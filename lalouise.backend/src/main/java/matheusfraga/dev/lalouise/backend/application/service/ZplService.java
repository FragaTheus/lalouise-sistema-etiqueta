package matheusfraga.dev.lalouise.backend.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.exception.print.LabelPrintException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class ZplService {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
    private static final String REPRINT_BASE_URL =
            "https://lalouise-sistema-etiqueta.vercel.app/painel/etiquetas/reimpressao/";

    public String generate(Label label, Integer copies){
        try {
            int safeCopies = normalizeCopies(copies);
            log.info("Gerando layout ZPL para labelId: {} com {} cópia(s)", label.getId(), safeCopies);

            String zpl = buildZplLayout(label, safeCopies);

            log.info("Layout ZPL para labelId: {}", label.getId());
            return zpl;
        }catch (Exception e){
            log.error("Erro ao gerar layout ZPL para labelId: {}", label.getId(), e);
            throw new LabelPrintException("Erro ao gerar layout etiqueta: "+ e.getMessage(), e);
        }
    }

    private String buildZplLayout(Label label, int copies) {
        StringBuilder zpl = new StringBuilder();

        zpl.append("^XA\n^CI28\n^MMT\n^PW480\n^LL360\n^LS0\n");
        zpl.append(String.format("^PQ%d\n\n", copies));

        zpl.append("^FO30,20^A0N,30,30^FDLa Louise^FS\n");
        zpl.append("^FO30,55^GB420,2,2^FS\n");

        zpl.append(String.format("^FO30,70^A0N,20,20^FDResp: %s^FS\n",
                sanitize(label.getResponsible().getNickname(), 0, 40)));

        zpl.append(String.format("^FO30,95^A0N,20,20^FDSetor: %s^FS\n",
                sanitize(label.getSector().getName(), 0, 40)));

        zpl.append("^FO30,120^GB420,2,2^FS\n");

        zpl.append(String.format("^FO30,135^A0N,25,25^FD%s^FS\n",
                sanitize(label.getProduct().getName(), 0, 45)));

        zpl.append(String.format("^FO30,170^A0N,22,22^FDLote: %s^FS\n",
                sanitize(label.getLote(), 0, 30)));

        zpl.append(String.format("^FO30,200^A0N,25,25^FDVal: %s^FS\n",
                label.getExpirationDate().format(formatter)));

        LocalDateTime emissionDateTime = resolveEmissionDateTime(label);
        zpl.append(String.format("^FO30,230^A0N,20,20^FDFab: %s^FS\n",
                emissionDateTime.format(formatter)));
        zpl.append(String.format("^FO30,252^A0N,20,20^FDHora: %s^FS\n",
                emissionDateTime.format(timeFormatter)));

        String qrData = buildQRCodeData(label);
        zpl.append(String.format("^FO320,135^BQN,2,3,Q^FDQA,%s^FS\n", qrData));

        zpl.append("^XZ");
        return zpl.toString();
    }

    private String buildQRCodeData(Label label){
        return REPRINT_BASE_URL + label.getId();
    }

    private LocalDateTime resolveEmissionDateTime(Label label) {
        String[] candidateGetters = {
                "getEmissionDateTime", "getEmissionDate", "getIssueDateTime", "getIssueDate", "getCreatedAt"
        };

        for (String getter : candidateGetters) {
            try {
                Method method = label.getClass().getMethod(getter);
                Object value = method.invoke(label);

                if (value instanceof LocalDateTime dt) return dt;
                if (value instanceof LocalDate d) return d.atStartOfDay();
            } catch (Exception ignored) {
                // tenta próximo getter
            }
        }

        return LocalDateTime.now();
    }

    private int normalizeCopies(Integer copies) {
        if (copies == null || copies < 1) return 1;
        return Math.min(copies, 9999);
    }

    private String sanitize(String text){
        return sanitize(text, 0, 100);
    }

    private String sanitize(String text, int minLength, int maxLength){
        if (text == null || text.isBlank()) return "";

        int safeMin = Math.max(0, minLength);
        int safeMax = Math.max(safeMin, maxLength);

        String cleaned = text
                .replace("^", "")
                .replace("~", "")
                .replace("|", "-")
                .replace("\\", "")
                .trim();

        if (cleaned.length() > safeMax) {
            return cleaned.substring(0, safeMax);
        }

        return cleaned;
    }
}
