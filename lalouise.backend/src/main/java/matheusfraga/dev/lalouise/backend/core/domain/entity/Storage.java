package matheusfraga.dev.lalouise.backend.core.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.core.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.core.domain.vo.StorageName;

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

    @Embedded
    private StorageName name;

    @Enumerated(EnumType.STRING)
    private StorageType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;

    public Storage(String name, StorageType type, Sector sector) {
        this.name = new StorageName(name);
        this.type = type;
        this.sector = sector;
    }

    public void setName(String name) {
        this.name = new  StorageName(name);
    }

    public String getName() {
        return name.value();
    }
}
