package matheusfraga.dev.lalouise.backend.core.repository;

import matheusfraga.dev.lalouise.backend.core.entity.User;
import matheusfraga.dev.lalouise.backend.core.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    List<User> findAllByNicknameValue(String username);

    Optional<User> findByEmailValue(String email);

    boolean existsByEmailValue(String email);

    List<User> findAllByRole(Role role);

}
