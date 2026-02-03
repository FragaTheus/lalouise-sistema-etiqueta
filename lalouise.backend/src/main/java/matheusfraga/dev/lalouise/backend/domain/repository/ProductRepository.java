package matheusfraga.dev.lalouise.backend.domain.repository;

import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Query("""
        SELECT p FROM Product p
        WHERE (:name IS NULL OR LOWER(p.name)  LIKE LOWER(CONCAT('%', :name, '%')) )
    """)
    Page<Product> findAllByFilter(@Param("name")String name, Pageable pageable);

    boolean existsByNameIgnoreCase(String name);
}
