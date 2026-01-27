package matheusfraga.dev.lalouise.backend.infra.security;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.domain.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE" + user.getRole().name()));
    }

    @Override
    public String getPassword() {
        return user.getPassword().password();
    }

    @Override
    public String getUsername() {
        return user.getEmail().value();
    }

}
