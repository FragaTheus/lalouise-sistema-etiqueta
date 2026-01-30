package matheusfraga.dev.lalouise.backend.core.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;

import java.util.UUID;

@Entity
@Table(name = "storages")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Storage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter
    private String name;

    @Enumerated(EnumType.STRING)
    private StorageType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;

    public Storage(String name, StorageType type, Sector sector) {
        this.name = name;
        this.type = type;
        this.sector = sector;
    }
}
