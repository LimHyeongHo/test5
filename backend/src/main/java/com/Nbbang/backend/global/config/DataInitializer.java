package com.Nbbang.backend.global.config;

import com.Nbbang.backend.domain.auth.entity.UserAccount;
import com.Nbbang.backend.domain.auth.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserAccountRepository userAccountRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        createTestAccountIfNotFound("admin@naver.com", "관리자", "admin1234", "ROLE_ADMIN");
        createTestAccountIfNotFound("seller01@test.com", "판매자1", "1234", "ROLE_SELLER");
        createTestAccountIfNotFound("seller02@test.com", "판매자2", "1234", "ROLE_SELLER");
        createTestAccountIfNotFound("buyer01@test.com", "구매자1", "1234", "ROLE_BUYER");
        createTestAccountIfNotFound("buyer02@test.com", "구매자2", "1234", "ROLE_BUYER");
    }

    private void createTestAccountIfNotFound(String email, String nickname, String password, String role) {
        if (!userAccountRepository.existsById(email)) {
            UserAccount account = new UserAccount();
            account.setEmail(email);
            account.setNickname(nickname);
            account.setPassword(password);
            account.setRole(role);
            userAccountRepository.save(account);
        }
    }
}
