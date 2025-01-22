package com.aidlebanon.AidLebanon.Entity;

import java.io.Serializable;

import jakarta.persistence.*;

@Embeddable
public class AdminId implements Serializable {

	@Column(name = "Username")
	private String username;

	@Column(name = "Password")
	private String password;

	// Getters and setters
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	// hashCode and equals methods
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		AdminId adminId = (AdminId) o;

		if (!username.equals(adminId.username))
			return false;
		return password.equals(adminId.password);
	}

	@Override
	public int hashCode() {
		int result = username.hashCode();
		result = 31 * result + password.hashCode();
		return result;
	}
}
