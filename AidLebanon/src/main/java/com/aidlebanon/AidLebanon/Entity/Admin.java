package com.aidlebanon.AidLebanon.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Admin") // Ensure this matches the existing table name
public class Admin {

	@EmbeddedId
	private AdminId adminId; // Composite key

	// Getters and setters
	public AdminId getAdminId() {
		return adminId;
	}

	public void setAdminId(AdminId adminId) {
		this.adminId = adminId;
	}
}