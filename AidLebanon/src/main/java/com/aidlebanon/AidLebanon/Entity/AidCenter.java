package com.aidlebanon.AidLebanon.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "AidCenter")
public class AidCenter {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CenterId")
	private Integer centerId;

	@Column(name = "Name", nullable = false, length = 100)
	private String name;

	@Lob
	@Column(name = "License", nullable = false)
	private byte[] license;

	@Column(name = "Location", nullable = false, length = 255)
	private String location;

	@Column(name = "ContactInfo", nullable = false, length = 100)
	private String contactInfo;

	// Getters and Setters
	public Integer getCenterId() {
		return centerId;
	}

	public void setCenterId(Integer centerId) {
		this.centerId = centerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getLicense() {
		return license;
	}

	public void setLicense(byte[] license) {
		this.license = license;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getContactInfo() {
		return contactInfo;
	}

	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
	}
}
