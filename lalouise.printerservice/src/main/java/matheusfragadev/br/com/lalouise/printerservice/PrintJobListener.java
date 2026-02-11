package matheusfragadev.br.com.lalouise.printerservice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class PrintJobListener {

    private final ZebraPrinterService zebraPrinterService;

    @RabbitListener(queues = "${lalouise.queue.print-labels}")
    public void consume(PrintMessageCommand command) throws IOException {
        log.info("Job recebido: {}", command.jobId());
        zebraPrinterService.sendToPrinter(command.zpl());
    }

}
