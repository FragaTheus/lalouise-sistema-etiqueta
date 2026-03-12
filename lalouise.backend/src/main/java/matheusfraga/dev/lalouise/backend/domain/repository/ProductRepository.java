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
        WHERE p.isActive = true
          AND (
                :search IS NULL
                OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))
          )
    """)
    Page<Product> findAllByFilter(@Param("search") String search, Pageable pageable);

    @Query("""
        SELECT p FROM Product p
        WHERE p.isActive = false
          AND (
                :search IS NULL
                OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))
          )
    """)
    Page<Product> findAllDeletedProductsFilter(@Param("search") String search, Pageable pageable);

    boolean existsByNameIgnoreCase(String name);
}
