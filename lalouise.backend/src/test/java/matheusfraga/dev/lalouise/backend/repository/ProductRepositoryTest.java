package matheusfraga.dev.lalouise.backend.repository;

import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.repository.ProductRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.PageRequest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    @DisplayName("Deve retornar página de produtos filtrada por nome")
    void shouldReturnPagedProducts() {
        entityManager.persist(new Product("Cerveja Ipa"));
        entityManager.persist(new Product("Cerveja Lager"));
        entityManager.persist(new Product("Refrigerante"));

        var pageable = PageRequest.of(0, 10);
        var result = repository.findAllByFilter("cerveja", pageable);

        assertThat(result.getContent()).hasSize(2);
        assertThat(result.getTotalElements()).isEqualTo(2);
    }
}
