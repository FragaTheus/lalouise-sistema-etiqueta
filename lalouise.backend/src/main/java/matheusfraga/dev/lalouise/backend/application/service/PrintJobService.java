package matheusfraga.dev.lalouise.backend.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import matheusfraga.dev.lalouise.backend.application.command.printjob.PrintMessageCommand;
import matheusfraga.dev.lalouise.backend.infra.config.RabbitConfig;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrintJobService {

    private final RabbitTemplate rabbitTemplate;

    public void queue(String zpl, Integer copies) {
        UUID jobId = UUID.randomUUID();

        PrintMessageCommand command = PrintMessageCommand.builder()
                .jobId(jobId)
                .zpl(zpl)
                .copies(copies)
                .build();

        try {
            log.info("Despachando Job de impressão: ID={}, Cópias={}", jobId, copies);

            rabbitTemplate.convertAndSend(
                    RabbitConfig.LABEL_EXCHANGE,
                    RabbitConfig.PRINT_ROUTING_KEY,
                    command
            );

            log.info("Job {} enfileirado com sucesso no RabbitMQ.", jobId);

        } catch (AmqpException e) {
            log.error("FALHA DE COMUNICAÇÃO (RabbitMQ): Não foi possível enviar o Job {}. Erro: {}",
                    jobId, e.getMessage());

            throw new RuntimeException("Serviço de fila de impressão indisponível.", e);

        } catch (Exception e) {
            log.error("ERRO INESPERADO ao processar Job de impressão {}: {}", jobId, e.getMessage());
            throw e;
        }
    }
}
