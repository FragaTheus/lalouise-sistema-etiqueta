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
    public void createProduct(String name, String description) {
        if (repository.existsByNameIgnoreCase(name)) {
            throw new ProductAlreadyExistsException();
        }
        Product product = new Product(name, description);
        repository.save(product);
    }

    @Transactional
    public void updateProduct(UUID id, String newName, String description) {
        Product product = getProduct(id);

        boolean hasName = newName != null && !newName.isBlank();
        boolean hasDescription = description != null && !description.isBlank();

        if (!hasName && !hasDescription) {
            throw new NoDataForUpdateException();
        }

        if (hasName) {
            boolean changingName = !product.getName().equalsIgnoreCase(newName);
            if (changingName && repository.existsByNameIgnoreCase(newName)) {
                throw new ProductAlreadyExistsException();
            }
            product.setName(newName);
        }

        if (hasDescription) {
            product.setDescription(description);
        }
    }

    @Transactional
    public void deleteProduct(UUID id) {
        Product product = getProduct(id);
        product.setActive(false);
    }

    public Page<Product> getAllProducts(String search, Pageable pageable) {
        return repository.findAllByFilter(search, pageable);
    }

    public Page<Product> getDeletedProducts(String search, Pageable pageable) {
        return repository.findAllDeletedProductsFilter(search, pageable);
    }

    @Transactional
    public void restoreProduct(UUID id) {
        Product product = getProduct(id);
        product.setActive(true);
    }
}
