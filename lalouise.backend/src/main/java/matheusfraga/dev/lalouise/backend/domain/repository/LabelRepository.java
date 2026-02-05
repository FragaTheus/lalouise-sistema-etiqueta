package matheusfraga.dev.lalouise.backend.domain.repository;

import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface LabelRepository extends JpaRepository<Label, UUID> {

    @Query("""
        SELECT l FROM Label l
        WHERE (:responsibleId IS NULL OR l.responsible.id = :responsibleId)
        AND (:productName IS NULL OR LOWER(l.product.name) LIKE LOWER(CONCAT('%', :productName, '%')))
        AND (:responsibleName IS NULL OR LOWER(l.responsible.nickname) LIKE LOWER(CONCAT('%', :responsibleName, '%')))
        AND (:sectorName IS NULL OR LOWER(l.sector.name) LIKE LOWER(CONCAT('%', :sectorName, '%')))
        AND (:status IS NULL OR l.status = :status)
    """)
    Page<Label> findByFilters(
            @Param("responsibleId") UUID responsibleId,
            @Param("productName") String productName,
            @Param("responsibleName") String responsibleName,
            @Param("sectorName") String sectorName,
            @Param("status") LabelStatus status,
            Pageable Pageable
    );

    List<Label> findAllByExpirationDateAndStatus(LocalDate localDate, LabelStatus status);

    List<Label> findAllByExpirationDateLessThanEqualAndStatusIn(LocalDate localDate, List<LabelStatus> A_VENCER);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM Label l WHERE l.status IN :statuses AND l.issueDate < :limitDate")
    int deleteOldLabelsByStatusIn(@Param("statuses") List<LabelStatus> statuses,
                                  @Param("limitDate") LocalDate limitDate);

}