package matheusfraga.dev.lalouise.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "product_id")
    private Product product;

    @JoinColumn(nullable = false, name = "sector_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Sector sector;

    @JoinColumn(nullable = false, name = "responsible_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Account responsible;

    @Setter
    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Setter
    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LabelStatus status;

    public Label(Product product, Sector sector, Account responsible, LocalDate issueDate,LocalDate expirationDate, LabelStatus status) {
        this.product = product;
        this.sector = sector;
        this.responsible = responsible;
        this.issueDate = issueDate;
        this.expirationDate = expirationDate;
        this.status = status;
    }

    public Label(UUID labelId, Product product, Sector sector, Account responsible, LocalDate issueDate,LocalDate expirationDate, LabelStatus labelStatus) {
        this.id = labelId;
        this.product = product;
        this.sector = sector;
        this.responsible = responsible;
        this.issueDate = issueDate;
        this.expirationDate = expirationDate;
        this.status = labelStatus;
    }
}
