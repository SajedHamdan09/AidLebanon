package com.aidlebanon.AidLebanon.Entity;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
public class Service {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer serviceId;
	private String serviceType;

	@ManyToOne
	@JoinColumn(name = "centerId")
	private AidCenter aidCenter;

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public AidCenter getAidCenter() {
		return aidCenter;
	}

	public void setAidCenter(AidCenter aidCenter) {
		this.aidCenter = aidCenter;
	}

	// Getters and Setters
}
