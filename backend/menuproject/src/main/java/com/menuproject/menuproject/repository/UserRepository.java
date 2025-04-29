package com.menuproject.menuproject.repository;

import com.menuproject.menuproject.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories(basePackages = "com.menuproject.menuproject.repository", queryLookupStrategy = EnableJpaRepositories.QueryLookupStrategy.Key.CREATE_IF_NOT_FOUND)
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}
