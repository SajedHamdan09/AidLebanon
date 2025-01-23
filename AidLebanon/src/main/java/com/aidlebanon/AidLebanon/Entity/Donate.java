package com.aidlebanon.AidLebanon.Entity;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "Donate")
public class Donate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int donate; // Assuming `Donate` is the primary key

	@ManyToOne
	@JoinColumn(name = "UserId")
	private User user; // Foreign key reference to User

	@ManyToOne
	@JoinColumn(name = "CenterId")
	private AidCenter aidCenter; // Foreign key reference to AidCenter

	@Temporal(TemporalType.DATE)
	private Date donationDate;

	private String donationType;

	// Getters and Setters
	public int getDonate() {
		return donate;
	}

	public void setDonate(int donate) {
		this.donate = donate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public AidCenter getAidCenter() {
		return aidCenter;
	}

	public void setAidCenter(AidCenter aidCenter) {
		this.aidCenter = aidCenter;
	}

	public Date getDonationDate() {
		return donationDate;
	}

	public void setDonationDate(Date donationDate) {
		this.donationDate = donationDate;
	}

	public String getDonationType() {
		return donationType;
	}

	public void setDonationType(String donationType) {
		this.donationType = donationType;
	}
}
