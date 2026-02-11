package matheusfragadev.br.com.lalouise.printerservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;

@Slf4j
@Service
public class ZebraPrinterService {

    @Value("${printer.ip}")
    private String printerIp;

    public void sendToPrinter(PrintMessageCommand command) throws IOException {
        try (Socket socket = new Socket(printerIp, 9100);
             DataOutputStream outputStream = new DataOutputStream(socket.getOutputStream())){
            for (int i=0; i<command.copies(); i++){
                outputStream.writeBytes(command.zpl());
                outputStream.flush();
            }
            log.info("Zpl enviado para impressora no IP {}: ",  printerIp);
        } catch (IOException e) {
            log.error("Erro ao enviar zpl para impressora: {} ", e.getMessage());
        }
    }

    public void sendToPrinter(String zpl) {
        System.out.println(zpl + "Etiqueta impressa com sucesso!");
    }

}
