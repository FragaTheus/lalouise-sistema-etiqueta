package matheusfraga.dev.lalouise.backend.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.exception.print.LabelPrintException;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class ZplService {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public String generate(Label label){
        try {
            log.info("Gerando layout ZPL para labelId: {}", label.getId());

            String zpl = buildZplLayout(label);

            log.info("Layout ZPL para labelId: {}", label.getId());
            return zpl;
        }catch (Exception e){
            log.error("Erro ao gerar layout ZPL para labelId: {}", label.getId(), e);
            throw new LabelPrintException("Erro ao gerar layout etiqueta: "+ e.getMessage(), e);
        }
    }

    private String buildZplLayout(Label label) {
        StringBuilder zpl = new StringBuilder();

        zpl.append("^XA\n^CI28\n^MMT\n^PW480\n^LL320\n^LS0\n\n");

        zpl.append("^FO30,20^A0N,30,30^FDLa Louise^FS\n");
        zpl.append("^FO30,55^GB420,2,2^FS\n");

        zpl.append(String.format("^FO30,70^A0N,20,20^FDResp: %s^FS\n",
                sanitize(label.getResponsible().getNickname())));

        zpl.append(String.format("^FO30,95^A0N,20,20^FDSetor: %s^FS\n",
                sanitize(label.getSector().getName())));

        zpl.append("^FO30,120^GB420,2,2^FS\n");

        zpl.append(String.format("^FO30,135^A0N,25,25^FD%s^FS\n",
                sanitize(label.getProduct().getName())));

        zpl.append(String.format("^FO30,170^A0N,25,25^FDVal: %s^FS\n",
                label.getExpirationDate().format(formatter)));

        String qrData = buildQRCodeData(label);
        zpl.append(String.format("^FO320,135^BQN,2,4,Q^FDQA,%s^FS\n", qrData));

        zpl.append("^XZ");

        return zpl.toString();
    }

    private String buildQRCodeData(Label label){
        return label.getId().toString();
    }

    private String sanitize(String text){
        if(text == null || text.isEmpty()) return "";

        return text
                .replace("^", "")
                .replace("~", "")
                .replace("|", "-")
                .replace("\\", "")
                .trim()
                .substring(0, Math.min(text.length(), 100));
    }

}
