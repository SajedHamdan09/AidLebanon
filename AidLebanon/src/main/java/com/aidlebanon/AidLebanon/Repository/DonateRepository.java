package com.aidlebanon.AidLebanon.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aidlebanon.AidLebanon.Entity.Donate;

@Repository
public interface DonateRepository extends JpaRepository<Donate, Integer> {
	// You can add custom query methods here if needed
}
