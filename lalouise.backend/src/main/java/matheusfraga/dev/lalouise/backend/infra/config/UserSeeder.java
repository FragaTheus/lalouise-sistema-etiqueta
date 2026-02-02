package matheusfraga.dev.lalouise.backend.infra.config;

import lombok.RequiredArgsConstructor;
import matheusfraga.dev.lalouise.backend.core.domain.entity.Account;
import matheusfraga.dev.lalouise.backend.core.domain.enums.Role;
import matheusfraga.dev.lalouise.backend.core.domain.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class UserSeeder {

    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder encoder;

    @Bean
    CommandLineRunner run() {
        return args -> {
            if (accountRepository.count() == 0) {
                var admin = new Account(
                        "Lalouise",
                        "admin@lalouise.com",
                        encoder.encode("Admin@123"),
                        Role.ADMIN
                );
                accountRepository.save(admin);
                System.out.println("Admin criado na base!!! "+admin);
            }else{
                System.out.println("Admin ja estava na base!!!");
            }
        };
    }

}
