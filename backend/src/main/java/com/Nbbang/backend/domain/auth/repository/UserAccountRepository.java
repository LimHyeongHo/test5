package com.Nbbang.backend.domain.auth.repository;

import com.Nbbang.backend.domain.auth.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
}
