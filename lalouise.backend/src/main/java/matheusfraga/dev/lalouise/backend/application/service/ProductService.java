package matheusfraga.dev.lalouise.backend.application.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.exception.product.ProductAlreadyExistsException;
import matheusfraga.dev.lalouise.backend.domain.exception.product.ProductNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.exception.user.NoDataForUpdateException;
import matheusfraga.dev.lalouise.backend.domain.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public Product getProduct(UUID id) {
        return repository.findById(id)
                .orElseThrow(ProductNotFoundException::new);
    }

    @Transactional
    public void createProduct(String name) {
        if (repository.existsByNameIgnoreCase(name)) {
            throw new ProductAlreadyExistsException();
        }
        Product product = new Product(name);
        repository.save(product);
    }

    @Transactional
    public void updateProduct(UUID id, String newName) {
        Product product = getProduct(id);

        if (repository.existsByNameIgnoreCase(newName)) {
            throw new ProductAlreadyExistsException();
        }

        product.setName(newName);
    }

    @Transactional
    public void deleteProduct(UUID id) {
        if (!repository.existsById(id)) {
            throw new ProductNotFoundException();
        }
        repository.deleteById(id);
    }

    public Page<Product> getAllProducts(String name, Pageable pageable) {
        return repository.findAllByFilter(name, pageable);
    }
}
