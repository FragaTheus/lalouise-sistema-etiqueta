package matheusfraga.dev.lalouise.backend.infra.security;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.domain.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private final Account account;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + account.getRole().name()));
    }

    public UUID getId(){
        return account.getId();
    }

    @Override
    public String getUsername() {
        return account.getEmail();
    }

    public String getNickname(){
        return account.getNickname();
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    public Role getRole() {
        return account.getRole();
    }

}
