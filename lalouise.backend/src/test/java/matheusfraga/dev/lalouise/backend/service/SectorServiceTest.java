package matheusfraga.dev.lalouise.backend.service;

import matheusfraga.dev.lalouise.backend.application.command.sector.CreateSectorCommand;
import matheusfraga.dev.lalouise.backend.application.command.sector.UpdateSectorInputCommand;
import matheusfraga.dev.lalouise.backend.application.service.AccountService;
import matheusfraga.dev.lalouise.backend.application.service.SectorService;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.entity.Sector;
import matheusfraga.dev.lalouise.backend.domain.enums.StorageType;
import matheusfraga.dev.lalouise.backend.domain.exception.sector.SectorAlreadyExistsException;
import matheusfraga.dev.lalouise.backend.domain.exception.sector.SectorNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.exception.user.NoDataForUpdateException;
import matheusfraga.dev.lalouise.backend.domain.repository.SectorRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SectorServiceTest {

    @Mock
    private SectorRepository repository;

    @Mock
    private AccountService accountService;

    @InjectMocks
    private SectorService sectorService;

    @Nested
    @DisplayName("Testes de Criação")
    class CreateTests {

        @Test
        @DisplayName("Deve criar um setor com sucesso")
        void shouldCreateSectorSuccessfully() {
            // Arrange
            var command = new CreateSectorCommand("Almoxarifado", "Desc", List.of(StorageType.AMBIENTE), UUID.randomUUID());
            var account = mock(Account.class);

            when(repository.existsByNameIgnoreCase(command.name())).thenReturn(false);
            when(accountService.getUserById(command.responsibleId())).thenReturn(account);

            // Act
            sectorService.createSector(command);

            // Assert
            verify(repository, times(1)).save(any(Sector.class));
        }

        @Test
        @DisplayName("Deve lançar exceção quando o nome do setor já existir")
        void shouldThrowExceptionWhenNameExists() {
            var command = CreateSectorCommand.builder().name("Existente").build();
            when(repository.existsByNameIgnoreCase("Existente")).thenReturn(true);

            assertThrows(SectorAlreadyExistsException.class, () -> sectorService.createSector(command));
            verify(repository, never()).save(any());
        }
    }

    @Nested
    @DisplayName("Testes de Atualização")
    class UpdateTests {

        @Test
        @DisplayName("Deve atualizar o nome do setor com sucesso")
        void shouldUpdateName() {
            // Arrange
            var id = UUID.randomUUID();
            var sector = new Sector("Nome Antigo", "Desc", mock(Account.class), List.of());
            var command = UpdateSectorInputCommand.builder().id(id).name("Novo Nome").build();

            when(repository.findById(id)).thenReturn(Optional.of(sector));
            when(repository.existsByNameIgnoreCase("Novo Nome")).thenReturn(false);

            // Act
            sectorService.updateSector(command);

            // Assert
            assertEquals("Novo Nome", sector.getName());
        }

        @Test
        @DisplayName("Deve lançar exceção quando não houver dados para atualizar")
        void shouldThrowExceptionWhenNoDataProvided() {
            var command = UpdateSectorInputCommand.builder().id(UUID.randomUUID()).build();

            assertThrows(NoDataForUpdateException.class, () -> sectorService.updateSector(command));
        }
    }

    @Nested
    @DisplayName("Testes de Busca e Deleção")
    class QueryAndDeleteTests {

        @Test
        @DisplayName("Deve lançar exceção ao buscar setor inexistente")
        void shouldThrowNotFound() {
            var id = UUID.randomUUID();
            when(repository.findById(id)).thenReturn(Optional.empty());

            assertThrows(SectorNotFoundException.class, () -> sectorService.getSector(id));
        }

        @Test
        @DisplayName("Deve desativar setor com sucesso")
        void shouldDeactivateSector() {
            var id = UUID.randomUUID();
            var sector = mock(Sector.class);
            when(repository.findById(id)).thenReturn(Optional.of(sector));

            sectorService.deactivateSector(id);

            verify(sector).deactivate();
            verify(repository).save(sector);
        }

        @Test
        @DisplayName("Deve lançar erro ao tentar desativar setor que não existe")
        void shouldThrowErrorOnDeactivateNonExistent() {
            var id = UUID.randomUUID();
            when(repository.findById(id)).thenReturn(Optional.empty());

            assertThrows(SectorNotFoundException.class, () -> sectorService.deactivateSector(id));
            verify(repository, never()).save(any());
        }
    }
}
