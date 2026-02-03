package matheusfraga.dev.lalouise.backend.infra.in.handler;

import java.time.Instant;

public record HandlerResponse<T>(
        Instant timestamp,
        int status,
        String message,
        T data
) {

    public HandlerResponse(int status, String message, T data){
        this(Instant.now(), status, message, data);
    }

    public static HandlerResponse<Void> withoutData(int status, String message){
        return new HandlerResponse<Void>(Instant.now(), status, message, null);
    }

}
