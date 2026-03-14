package matheusfraga.dev.lalouise.backend.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LabelLotSequence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public static LabelLotSequence create() {
        return new LabelLotSequence();
    }
}
