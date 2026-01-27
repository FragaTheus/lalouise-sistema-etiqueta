package matheusfraga.dev.lalouise.backend.core.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.vo.UserEmail;
import matheusfraga.dev.lalouise.backend.core.domain.vo.UserNickname;
import matheusfraga.dev.lalouise.backend.core.domain.vo.UserPassword;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {

    @Id
    private UUID id;

    @Setter
    @Embedded
    private UserNickname nickname;

    @Embedded
    private UserEmail email;

    @Setter
    @Embedded
    private UserPassword password;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public User(UUID id, String nickname, String email, String password, Role role) {
        this.id = id;
        this.nickname = new UserNickname(nickname);
        this.email = new UserEmail(email);
        this.password = new UserPassword(password);
        this.role = role;
    }

    public User(String nickname, String email, String password,  Role role) {
        this.id = UUID.randomUUID();
        this.nickname = new UserNickname(nickname);
        this.email = new UserEmail(email);
        this.password = new UserPassword(password);
        this.role = role;
    }


}
