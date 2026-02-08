package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.application.service.ProductService;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.exception.product.ProductAlreadyExistsException;
import matheusfraga.dev.lalouise.backend.domain.exception.product.ProductNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.exception.user.NoDataForUpdateException;
import matheusfraga.dev.lalouise.backend.domain.repository.ProductRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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
    private ProductService productService;

    @Nested
    @DisplayName("Busca de Produtos")
    class GetProductTests {

        @Test
        @DisplayName("Deve retornar um produto quando o ID existir")
        void shouldReturnProductWhenIdExists() {
            var id = UUID.randomUUID();
            var product = new Product("Cerveja La Louise");
            when(repository.findById(id)).thenReturn(Optional.of(product));

            var result = productService.getProduct(id);

            assertNotNull(result);
            assertEquals("Cerveja La Louise", result.getName());
        }

        @Test
        @DisplayName("Deve lançar ProductNotFoundException quando ID não existir")
        void shouldThrowExceptionWhenProductNotFound() {
            var id = UUID.randomUUID();
            when(repository.findById(id)).thenReturn(Optional.empty());

            assertThrows(ProductNotFoundException.class, () -> productService.getProduct(id));
        }
    }

    @Nested
    @DisplayName("Criação de Produtos")
    class CreateProductTests {

        @Test
        @DisplayName("Deve criar um produto com sucesso")
        void shouldCreateProduct() {
            String name = "Novo Produto";
            when(repository.existsByNameIgnoreCase(name)).thenReturn(false);

            productService.createProduct(name);

            verify(repository, times(1)).save(any(Product.class));
        }

        @Test
        @DisplayName("Deve lançar ProductAlreadyExistsException se o nome já estiver em uso")
        void shouldThrowExceptionWhenNameAlreadyExists() {
            String name = "Produto Repetido";
            when(repository.existsByNameIgnoreCase(name)).thenReturn(true);

            assertThrows(ProductAlreadyExistsException.class, () -> productService.createProduct(name));
            verify(repository, never()).save(any());
        }
    }

    @Nested
    @DisplayName("Atualização de Produtos")
    class UpdateProductTests {

        @Test
        @DisplayName("Deve atualizar o nome com sucesso")
        void shouldUpdateProductName() {
            var id = UUID.randomUUID();
            var product = new Product("Nome Antigo");
            String newName = "Nome Novo";

            when(repository.findById(id)).thenReturn(Optional.of(product));
            when(repository.existsByNameIgnoreCase(newName)).thenReturn(false);

            productService.updateProduct(id, newName);

            assertEquals(newName, product.getName());
        }
    }

    @Nested
    @DisplayName("Listagem e Deleção")
    class ListAndDeleteTests {

        @Test
        @DisplayName("Deve retornar uma página de produtos")
        void shouldReturnPageOfProducts() {
            var pageable = Pageable.unpaged();
            var page = new PageImpl<>(List.of(new Product("P1"), new Product("P2")));
            when(repository.findAllByFilter(anyString(), eq(pageable))).thenReturn(page);

            var result = productService.getAllProducts("filtro", pageable);

            assertEquals(2, result.getTotalElements());
            verify(repository).findAllByFilter("filtro", pageable);
        }

        @Test
        @DisplayName("Deve deletar produto se existir")
        void shouldDeleteProduct() {
            var id = UUID.randomUUID();
            when(repository.existsById(id)).thenReturn(true);

            productService.deleteProduct(id);

            verify(repository).deleteById(id);
        }
    }
}
