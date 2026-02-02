package matheusfraga.dev.lalouise.backend.infra.config;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.domain.repository.AccountRepository;
import matheusfraga.dev.lalouise.backend.infra.security.UserDetailsImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final AccountRepository accountRepository;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userEmail -> accountRepository.findByEmailIgnoreCase(userEmail)
                .map(UserDetailsImpl::new)
                .orElseThrow(()-> new UsernameNotFoundException("Usuario nao encontrado" + userEmail));
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
