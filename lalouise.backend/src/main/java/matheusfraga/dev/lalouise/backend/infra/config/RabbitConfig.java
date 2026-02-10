package matheusfraga.dev.lalouise.backend.infra.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String LABEL_EXCHANGE = "label.exchange";
    public static final String PRINT_QUEUE = "print.labels.queue";
    public static final String PRINT_ROUTING_KEY = "label.created.print";

    @Bean
    public TopicExchange labelExchange() {
        return new TopicExchange(LABEL_EXCHANGE);
    }

    @Bean
    public Queue printQueue() {
        return QueueBuilder.durable(PRINT_QUEUE).build();
    }

    @Bean
    public Binding labelBinding() {
        return  BindingBuilder.bind(printQueue()).to(labelExchange()).with(PRINT_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}
