package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.application.service.ProductService;
import matheusfraga.dev.lalouise.backend.domain.entity.Product; // Ajuste o import conforme sua entidade
import matheusfraga.dev.lalouise.backend.infra.in.controller.product.ProductController;
import matheusfraga.dev.lalouise.backend.infra.in.controller.product.ProductRequest;
import matheusfraga.dev.lalouise.backend.infra.security.TokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService productService;

    @MockitoBean
    private TokenService tokenService;

    @Test
    @DisplayName("Deve criar um produto com sucesso")
    void shouldCreateProduct() throws Exception {
        var request = new ProductRequest("Camiseta Branca");

        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(productService, times(1)).createProduct(request.name());
    }

    @Test
    @WithMockUser
    @DisplayName("Deve buscar um produto por ID")
    void shouldGetProductById() throws Exception {
        var id = UUID.randomUUID();
        // Simulando o retorno do service (ajuste conforme seu objeto de domínio)
        var mockProduct = mock(Product.class);
        when(mockProduct.getId()).thenReturn(id);
        when(mockProduct.getName()).thenReturn("Produto Teste");

        when(productService.getProduct(id)).thenReturn(mockProduct);

        mockMvc.perform(get("/api/v1/products/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Produto Teste"));
    }

    @Test
    @WithMockUser
    @DisplayName("Deve listar produtos paginados")
    void shouldListProducts() throws Exception {
        var id = UUID.randomUUID();
        var mockProduct = mock(Product.class);
        when(mockProduct.getId()).thenReturn(id);
        when(mockProduct.getName()).thenReturn("Produto Teste");

        var page = new PageImpl<>(List.of(mockProduct));
        when(productService.getAllProducts(any(), any(PageRequest.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/products")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Produto Teste"));
    }

    @Test
    @WithMockUser
    @DisplayName("Deve atualizar um produto apenas pelo ID e nome")
    void shouldUpdateProduct() throws Exception {
        var id = UUID.randomUUID();
        var request = new ProductRequest("Nome Atualizado");

        mockMvc.perform(patch("/api/v1/products/{id}", id)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());

        verify(productService).updateProduct(eq(id), eq("Nome Atualizado"));
    }
}