package matheusfragadev.br.com.lalouise.printerservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.print.*;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class ZebraPrinterService {

    @Value("${printer.name}")
    private String printerName;

    public void sendToPrinter(PrintMessageCommand command) throws PrintException {
        try{


            PrintService[] services = PrintServiceLookup.lookupPrintServices(null, null);
            PrintService myPrinter = null;

            for (PrintService service : services) {
                if (service.getName().equalsIgnoreCase(printerName)) {
                    myPrinter = service;
                  break;
              }
          }

          if (myPrinter == null) {
              log.error("Impressora {} nao encontrada! Verifique o nome no painel de controle", printerName);
          }

            assert myPrinter != null;
            DocPrintJob job = myPrinter.createPrintJob();

           for (int i=0; i< command.copies(); i++){
              byte[] bytes = command.zpl().getBytes(StandardCharsets.UTF_8);
              Doc doc = new SimpleDoc(bytes, DocFlavor.BYTE_ARRAY.AUTOSENSE, null);
              job.print(doc, null);
           }

            log.info("Job {} enviado com sucesso para a impressora USB: {}", command.jobId(), printerName);

        }catch(PrintException e){
            log.error("Erro na fila de impressão do windows: {}", e.getMessage());
        }
    }


}
