package matheusfraga.dev.lalouise.backend.infra.security;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.domain.exception.user.UserNotFoundException;
import matheusfraga.dev.lalouise.backend.domain.repository.AccountRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    @Cacheable(
            value = "users",
            key = "#username"
    )
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository.findByEmailIgnoreCase(username).map(UserDetailsImpl::new).orElseThrow(UserNotFoundException::new);
    }

}
