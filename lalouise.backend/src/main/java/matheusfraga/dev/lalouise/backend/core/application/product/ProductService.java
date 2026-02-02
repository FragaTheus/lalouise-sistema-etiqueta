package matheusfraga.dev.lalouise.backend.core.application.product;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.core.domain.exception.ProductNotFoundException;
import matheusfraga.dev.lalouise.backend.core.domain.exception.SameProductNameException;
import matheusfraga.dev.lalouise.backend.core.domain.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public Product getProduct(UUID id) {
        return repository.findById(id).orElseThrow(ProductNotFoundException::new);
    }

    public Product createProduct(String name) {
        Product product = new Product(name);
        return repository.save(product);
    }

    @Transactional
    public Product updateProduct(UUID id, String name) {
        Product product = getProduct(id);
        boolean isMatch = product.getName().equalsIgnoreCase(name);
        if(isMatch) throw new SameProductNameException();
        product.setName(name);
        return repository.save(product);
    }

    public void deleteProduct(UUID id) {
        repository.deleteById(id);
    }

    public Page<Product> getAllProducts(String name, Pageable pageable) {
        return repository.findAllByFilter(name, pageable);
    }

}
