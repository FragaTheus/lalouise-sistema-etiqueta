package matheusfraga.dev.lalouise.backend.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrintService {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public void printLabel(Label label){
        try {
            log.info("Gerando ZPL para labelId: {}", label.getId());

            String zpl = generateZPL(label);

            sendToMicrosservice(zpl, label);

            log.info("Label enviada para impressao!");
        }catch (Exception e){
            log.error("Erro ao gerar ZPL para labelId: {}", label.getId(), e);
            throw new RuntimeException("Erro ao imprimir etiqueta: "+ e.getMessage(), e);
        }
    }

    public void printMultipleCopies(Label label, int copies){
        if(copies < 1) throw new IllegalArgumentException("copies deve ser um positivo!");

        log.info("Imprimindo {} copias da label ID: {}", copies,label.getId());
        printLabel(label);

        for(int i = 0; i < copies; i++){
            log.info("Imprimindo copia {}/{}", i, copies);
        }
    }

    private String generateZPL(Label label) {
        StringBuilder zpl = new StringBuilder();

        zpl.append("^XA\n");
        zpl.append("^CI28\n");
        zpl.append("^MMT\n");
        zpl.append("^PW812\n");
        zpl.append("^LL1218\n");
        zpl.append("^LS0\n\n");

        zpl.append("^FO50,30^A0N,45,45^FDLa Louise^FS\n\n");

        zpl.append("^FO50,90^GB700,3,3^FS\n\n");

        zpl.append(String.format("^FO50,110^A0N,30,30^FDResponsavel: %s^FS\n",
                sanitize(label.getResponsible().getNickname())));

        zpl.append(String.format("^FO50,150^A0N,30,30^FDSetor: %s^FS\n\n",
                sanitize(label.getSector().getName())));

        zpl.append("^FO50,200^GB700,3,3^FS\n\n");

        zpl.append("^FO50,220^A0N,50,50^FDPRODUTO:^FS\n");
        zpl.append(String.format("^FO50,280^A0N,40,40^FD%s^FS\n\n",
                sanitize(label.getProduct().getName())));

        zpl.append(String.format("^FO50,340^A0N,35,35^FDValidade: %s^FS\n\n",
                label.getExpirationDate().format(formatter)));

        zpl.append("^FO50,400^GB700,3,3^FS\n\n");

        String qrData = buildQRCodeData(label);
        zpl.append(String.format("^FO250,430^BQN,2,8,Q^FDQA,%s^FS\n\n", qrData));

        zpl.append("^FO200,900^A0N,25,25^FDEscaneie para reimprimir^FS\n\n");

        zpl.append(String.format("^FO50,1150^A0N,20,20^FDEmitido: %s^FS\n\n",
                label.getIssueDate().format(formatter)));

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

    private void sendToMicrosservice(String zpl, Label label){
        printToConsole(zpl, label);
    }

    private void printToConsole(String zpl, Label label) {
        System.out.println("\n");
        System.out.println("================================================================================");
        System.out.println("                           ETIQUETA - ZPL GERADO                                ");
        System.out.println("================================================================================");
        System.out.println("ID: " + label.getId());
        System.out.println("Produto: " + label.getProduct().getName());
        System.out.println("Responsável: " + label.getResponsible().getNickname());
        System.out.println("Setor: " + label.getSector().getName());
        System.out.println("Validade: " + label.getExpirationDate().format(formatter));
        System.out.println("Status: " + label.getStatus());
        System.out.println("--------------------------------------------------------------------------------");
        System.out.println(zpl);
        System.out.println("--------------------------------------------------------------------------------");
        System.out.println("Total de caracteres: " + zpl.length());
        System.out.println("================================================================================");
        System.out.println("\n");
    }

}
