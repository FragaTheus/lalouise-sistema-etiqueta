package matheusfraga.dev.lalouise.backend.core.domain.repository;

import matheusfraga.dev.lalouise.backend.core.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    Optional<Account> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);

    @Query("""
    SELECT u FROM Account u 
    WHERE (:nickname IS NULL OR u.nickname LIKE %:nickname%) 
    AND (:email IS NULL OR u.email = :email) 
    AND (:role IS NULL OR u.role = :role)
    """)
    List<Account> findByFilters(
            @Param("nickname") String nickname,
            @Param("email") String email,
            @Param("role") Role role
    );

}
