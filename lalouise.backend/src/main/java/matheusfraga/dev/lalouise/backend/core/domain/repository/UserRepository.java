package matheusfraga.dev.lalouise.backend.core.domain.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmailValueIgnoreCase(String email);

    boolean existsByEmailValueIgnoreCase(String email);

    @Query("""
    SELECT u FROM User u 
    WHERE (:nickname IS NULL OR u.nickname.value LIKE %:nickname%) 
    AND (:email IS NULL OR u.email.value = :email) 
    AND (:role IS NULL OR u.role = :role)
    """)
    List<User> findByFilters(
            @Param("nickname") String nickname,
            @Param("email") String email,
            @Param("role") Role role
    );

}
