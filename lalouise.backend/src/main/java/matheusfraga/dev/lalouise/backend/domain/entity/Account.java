package matheusfraga.dev.lalouise.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.domain.exception.InternalException;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Setter
    @Column(nullable = false, length = 100)
    private String nickname;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 60)
    private String password;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    @Setter
    @Column(nullable = false)
    boolean isActive;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createAt;

    @Column
    private LocalDateTime updateAt;

    @Column
    private LocalDateTime deletedAt;

    @Column
    private LocalDateTime lastLogin;

    public Account(UUID id, String nickname, String email, String password, Role role, boolean isActive) {
        validateEmail(email);
        validatePassword(password);

        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
    }

    public Account(String nickname, String email, String password, Role role) {
        validateEmail(email);
        validatePassword(password);

        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = true;
    }

    @PrePersist
    public void prePersist() {
        this.createAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updateAt = LocalDateTime.now();
    }

    public void deactivate() {
        this.deletedAt = LocalDateTime.now();
        this.isActive = false;
    }

    public void reactivate(){
        this.isActive = true;
        this.deletedAt = null;
    }

    public void recordLastLogin(){
        this.lastLogin = LocalDateTime.now();
    }

    public void setPassword(String password) {
        validatePassword(password);
        this.password = password;
    }

    private static void validateEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new InternalException("Email cant be null or empty");
        }
        if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            throw new InternalException("Email format is invalid");
        }
    }

    private static void validatePassword(String password) {
        if (password == null || password.isEmpty()) throw new InternalException("Password cant be null or empty");
        if (password.length() < 20) throw new InternalException("Password length must be at least 20 characters");
        if (!password.matches("^[\\x20-\\x7E]+$")) throw new InternalException("Password is not a hash");
    }
}
