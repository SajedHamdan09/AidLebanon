package com.aidlebanon.AidLebanon.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aidlebanon.AidLebanon.Entity.AidCenter;

@Repository
public interface AidCenterRepository extends JpaRepository<AidCenter, Integer> {
	Optional<AidCenter> findByName(String name);
}
