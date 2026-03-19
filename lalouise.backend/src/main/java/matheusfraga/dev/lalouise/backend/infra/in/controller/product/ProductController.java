package matheusfraga.dev.lalouise.backend.infra.in.controller.product;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.application.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ProductInfo> getProduct(@PathVariable UUID id) {
        var product = service.getProduct(id);
        return ResponseEntity.ok(ProductMapper.toProductInfo(product));
    }

    @GetMapping
    public ResponseEntity<Page<ProductSummary>> getAllProducts
            (@RequestParam(value = "search", required = false) String search,
             @PageableDefault(size =  10, sort = "name") Pageable pageable) {
        var page = service.getAllProducts(search, pageable);
        var summaries = page.map(product -> new ProductSummary(product.getId(), product.getName(), product.getDescription()));
        return ResponseEntity.ok(summaries);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateProduct(@PathVariable UUID id,@Valid @RequestBody UpdateProductRequest request) {
        service.updateProduct(id, request.name(), request.description());
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody CreateProductRequest request){
        service.createProduct(request.name(), request.description());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/deleted")
    public ResponseEntity<Page<ProductSummary>> getAllDeletedProducts
            (@RequestParam(value = "search", required = false) String search,
             @PageableDefault(size =  10, sort = "name") Pageable pageable) {
        var page = service.getDeletedProducts(search, pageable);
        var summaries = page.map(product -> new ProductSummary(product.getId(), product.getName(), product.getDescription()));
        return ResponseEntity.ok(summaries);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/restore")
    public ResponseEntity<Void> restoreProduct(@PathVariable UUID id) {
        service.restoreProduct(id);
        return ResponseEntity.noContent().build();
    }

}
