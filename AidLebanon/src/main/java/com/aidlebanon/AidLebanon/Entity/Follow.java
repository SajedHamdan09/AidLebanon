package com.aidlebanon.AidLebanon.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Follow")
public class Follow {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FollowId")
	private int followId;

	@ManyToOne
	@JoinColumn(name = "UserId", referencedColumnName = "UserId")
	private User user;

	@ManyToOne
	@JoinColumn(name = "CenterId", referencedColumnName = "CenterId")
	private AidCenter aidCenter;

	// Getters and Setters
	public int getFollowId() {
		return followId;
	}

	public void setFollowId(int followId) {
		this.followId = followId;
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

	@Override
	public String toString() {
		return "Follow [followId=" + followId + ", user=" + user + ", aidCenter=" + aidCenter + "]";
	}
}
