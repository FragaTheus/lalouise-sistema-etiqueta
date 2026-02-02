package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.core.application.product.ProductService;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.core.domain.exception.ProductNotFoundException;
import matheusfraga.dev.lalouise.backend.core.domain.exception.SameProductNameException;
import matheusfraga.dev.lalouise.backend.core.domain.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    private UUID productId;
    private Product product;

    @BeforeEach
    void setUp() {
        productId = UUID.randomUUID();
        product = new Product("Frango");
    }

    @Nested
    @DisplayName("Criação de Produtos")
    class CreateProduct {
        @Test
        @DisplayName("Deve salvar um produto com sucesso")
        void shouldCreateProduct() {
            when(repository.save(any(Product.class))).thenReturn(product);

            Product result = service.createProduct("Frango");

            assertNotNull(result);
            assertEquals("Frango", result.getName());
            verify(repository, times(1)).save(any(Product.class));
        }
    }

    @Nested
    @DisplayName("Atualização de Produtos")
    class UpdateProduct {
        @Test
        @DisplayName("Deve atualizar o nome do produto quando for diferente")
        void shouldUpdateProduct() {
            String newName = "Carne";
            when(repository.findById(productId)).thenReturn(Optional.of(product));
            when(repository.save(any(Product.class))).thenReturn(product);

            Product result = service.updateProduct(productId, newName);

            assertEquals(newName, result.getName());
            verify(repository).save(product);
        }

        @Test
        @DisplayName("Deve lançar exceção quando o nome for igual (Ignore Case)")
        void shouldThrowExceptionWhenNameIsSame() {
            when(repository.findById(productId)).thenReturn(Optional.of(product));

            assertThrows(SameProductNameException.class, () ->
                    service.updateProduct(productId, "FRANGO")
            );

            verify(repository, never()).save(any());
        }
    }

    @Nested
    @DisplayName("Busca e Listagem")
    class FindProducts {
        @Test
        @DisplayName("Deve retornar produto por ID")
        void shouldGetProductById() {
            when(repository.findById(productId)).thenReturn(Optional.of(product));

            Product result = service.getProduct(productId);

            assertNotNull(result);
            verify(repository).findById(productId);
        }

        @Test
        @DisplayName("Deve lançar ProductNotFoundException quando ID não existir")
        void shouldThrowNotFound() {
            when(repository.findById(productId)).thenReturn(Optional.empty());

            assertThrows(ProductNotFoundException.class, () -> service.getProduct(productId));
        }

        @Test
        @DisplayName("Deve retornar página de produtos")
        void shouldReturnPageOfProducts() {
            Pageable pageable = mock(Pageable.class);
            Page<Product> page = new PageImpl<>(List.of(product));
            when(repository.findAllByFilter(anyString(), any(Pageable.class))).thenReturn(page);

            Page<Product> result = service.getAllProducts("Frango", pageable);

            assertFalse(result.isEmpty());
            assertEquals(1, result.getTotalElements());
        }
    }
}
