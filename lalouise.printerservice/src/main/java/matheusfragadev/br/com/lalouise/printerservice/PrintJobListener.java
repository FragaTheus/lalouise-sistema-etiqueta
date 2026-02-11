package matheusfragadev.br.com.lalouise.printerservice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import javax.print.PrintException;

@Slf4j
@Component
@RequiredArgsConstructor
public class PrintJobListener {

    private final ZebraPrinterService zebraPrinterService;

    @RabbitListener(queues = "${lalouise.queue.print-labels}")
    public void consume(PrintMessageCommand command) {
        try {
            log.info("Job recebido: {}", command.jobId());

            zebraPrinterService.sendToPrinter(command);

        } catch (PrintException e) {
            log.error("Erro físico na impressora. A mensagem voltará para a fila para tentar depois.");
            throw new AmqpRejectAndDontRequeueException(e);
        } catch (Exception e) {
            log.error("Erro irrecuperável no processamento do Job {}: {}", command.jobId(), e.getMessage());
        }
    }

}
