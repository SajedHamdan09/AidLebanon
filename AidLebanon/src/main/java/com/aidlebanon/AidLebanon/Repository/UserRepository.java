package com.aidlebanon.AidLebanon.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.aidlebanon.AidLebanon.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
