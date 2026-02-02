package matheusfraga.dev.lalouise.backend.infra.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.application.product.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @GetMapping("/{id}")
    public ResponseEntity<ProductInfo> getProduct(@PathVariable UUID id) {
        var product =  service.getProduct(id);
        var info = new ProductInfo(product.getName());
        return ResponseEntity.ok(info);
    }

    @GetMapping
    public ResponseEntity<Page<ProductSummary>> getAllProducts
            (@RequestParam(value = "name", required = false) String name,
             @PageableDefault(size =  10, sort = "name") Pageable pageable) {
        var page = service.getAllProducts(name, pageable);
        var summaries = page.map(product -> new ProductSummary(product.getId(), product.getName()));
        return ResponseEntity.ok(summaries);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateProduct(@PathVariable UUID id, @RequestBody ProductRequest request) {
        service.updateProduct(id, request.name());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody ProductRequest request){
        service.createProduct(request.name());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
