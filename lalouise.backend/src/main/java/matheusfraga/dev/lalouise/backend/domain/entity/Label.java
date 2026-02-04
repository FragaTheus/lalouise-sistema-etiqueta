package matheusfraga.dev.lalouise.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;

import java.time.LocalDateTime;
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

    @Column(name = "issue_date", nullable = false)
    private LocalDateTime issueDate;

    @Setter
    @Column(name = "expiration_date", nullable = false)
    private LocalDateTime expirationDate;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LabelStatus status;



    public Label(Product product, Sector sector, Account responsible, LocalDateTime expirationDate, LabelStatus status) {
        this.product = product;
        this.sector = sector;
        this.responsible = responsible;
        this.issueDate = LocalDateTime.now();
        this.expirationDate = expirationDate;
        this.status = status;
    }
}
