package com.aidlebanon.AidLebanon.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aidlebanon.AidLebanon.Entity.Admin;
import com.aidlebanon.AidLebanon.Entity.AdminId;

public interface AdminRepository extends JpaRepository<Admin, AdminId> {
	// Custom queries can be added here if necessary
}