package matheusfraga.dev.lalouise.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import matheusfraga.dev.lalouise.backend.core.application.product.ProductService;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.infra.controller.ProductController;
import matheusfraga.dev.lalouise.backend.infra.controller.ProductRequest;
import matheusfraga.dev.lalouise.backend.infra.security.TokenFilter;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService service;

    @MockitoBean
    private TokenFilter tokenFilter;

    @Test
    @DisplayName("Deve criar um produto quando o nome for válido")
    void shouldCreateProduct() throws Exception {
        ProductRequest request = new ProductRequest("Frango Assado");

        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Deve retornar 400 quando o nome tiver números ou caracteres especiais")
    void shouldReturn400WhenNameIsInvalid() throws Exception {
        ProductRequest request = new ProductRequest("Frango 123!");

        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Deve retornar 400 quando o nome for muito curto")
    void shouldReturn400WhenNameIsTooShort() throws Exception {
        ProductRequest request = new ProductRequest("Ovo"); // Menor que 5

        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Deve retornar um produto por ID")
    void shouldGetProductById() throws Exception {
        UUID id = UUID.randomUUID();
        Product product = new Product("Batata Doce");

        when(service.getProduct(id)).thenReturn(product);

        mockMvc.perform(get("/api/v1/products/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Batata Doce"));
    }

    @Test
    @DisplayName("Deve retornar lista paginada de produtos")
    void shouldReturnPagedProducts() throws Exception {
        Product product = new Product("Arroz Branco");
        var page = new PageImpl<>(List.of(product));

        when(service.getAllProducts(eq("Arroz"), any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/products")
                        .param("name", "Arroz"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Arroz Branco"));
    }

    @Test
    @DisplayName("Deve deletar um produto")
    void shouldDeleteProduct() throws Exception {
        UUID id = UUID.randomUUID();

        mockMvc.perform(delete("/api/v1/products/{id}", id))
                .andExpect(status().isNoContent());
    }
}
