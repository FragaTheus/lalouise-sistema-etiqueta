package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.application.service.ZplService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Label;
import matheusfraga.dev.lalouise.backend.domain.entity.Product;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.LabelStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ZplServiceTest {

    private final ZplService zplService = new ZplService();

    @Test
    @DisplayName("Deve incluir o lote no layout ZPL")
    void shouldIncludeLoteInZplLayout() {
        Product product = mock(Product.class);
        when(product.getName()).thenReturn("Sopa do dia");

        Sector sector = mock(Sector.class);
        when(sector.getName()).thenReturn("Cozinha");

        Account responsible = mock(Account.class);
        when(responsible.getNickname()).thenReturn("Matheus");

        Label label = new Label(
                UUID.randomUUID(),
                product,
                sector,
                responsible,
                LocalDate.now(),
                LocalDate.of(2026, 3, 20),
                LabelStatus.ATIVA,
                "L000777"
        );

        String zpl = zplService.generate(label);

        assertTrue(zpl.contains("Lote: L000777"));
        assertTrue(zpl.contains("Val: 20/03/2026"));
    }
}

