package matheusfraga.dev.lalouise.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;

import java.time.LocalDateTime;
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
    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account responsible;

    @Setter
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private List<StorageType> storages;

    @Column(nullable = false)
    private boolean isActive = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column
    private LocalDateTime deletedAt;

    public Sector(String name, String description, Account responsible, List<StorageType> storages) {
        this.name = name;
        this.description = description;
        this.responsible = responsible;
        this.storages = storages;
    }

    public void deactivate() {
        this.isActive = false;
        this.deletedAt = LocalDateTime.now();
    }

    public void reactivate() {
        this.isActive = true;
        this.deletedAt = null;
    }

    @PrePersist
    private void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    private void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
