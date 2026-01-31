package matheusfraga.dev.lalouise.backend.core.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.core.domain.vo.SectorName;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sector {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Embedded
    @Column(nullable = false, unique = true)
    private SectorName name;

    @Setter
    private String description;

    @OneToMany(mappedBy = "sector", cascade = CascadeType.ALL)
    private List<Storage> storages;

    public Sector(UUID id, String name, String description) {
        this.id = id;
        this.name = new SectorName(name);
        this.description = description;
    }

    public Sector(String name, String description) {
        this.name = new SectorName(name);
        this.description = description;
    }

    public void setName(String name) {
        this.name = new  SectorName(name);
    }

    public String getName() {
        return name.value();
    }
}
