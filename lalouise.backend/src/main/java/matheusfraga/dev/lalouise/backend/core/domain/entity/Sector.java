package matheusfraga.dev.lalouise.backend.core.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sector {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter
    @Column(nullable = false, unique = true)
    private String name;

    @Setter
    private String description;

    @OneToMany(mappedBy = "sector", cascade = CascadeType.ALL)
    private List<Storage> storages;

    public Sector(UUID id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Sector(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
