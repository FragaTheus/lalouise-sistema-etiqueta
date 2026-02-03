package matheusfraga.dev.lalouise.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@AllArgsConstructor
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

    @Setter
    @OneToOne(optional = false)
    @JoinColumn(name = "account_id", referencedColumnName = "id", unique = true)
    private Account responsible;

    @Setter
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<StorageType> storages;

    public Sector(String name, String description, Account responsible, List<StorageType> storages) {
        this.name = name;
        this.description = description;
        this.responsible = responsible;
        this.storages = storages;
    }
}
