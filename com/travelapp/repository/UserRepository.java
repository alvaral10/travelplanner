package com.travelapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
