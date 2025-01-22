package com.aidlebanon.AidLebanon.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "BlogPost")
public class BlogPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PostId")
	private Integer postId;

	@ManyToOne
	@JoinColumn(name = "CenterId", referencedColumnName = "CenterId", nullable = false)
	private AidCenter aidCenter; // Foreign key to AidCenter

	@Column(name = "Title", nullable = false, length = 255)
	private String title;

	@Column(name = "Content", nullable = false, columnDefinition = "TEXT")
	private String content;

	@Column(name = "ImageUrl", length = 255)
	private String imageUrl;

	@Column(name = "PostDate", nullable = false)
	private String postDate; // Post Date

	// Getters and Setters
	public Integer getPostId() {
		return postId;
	}

	public void setPostId(Integer postId) {
		this.postId = postId;
	}

	public AidCenter getAidCenter() {
		return aidCenter;
	}

	public void setAidCenter(AidCenter aidCenter) {
		this.aidCenter = aidCenter;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getPostDate() {
		return postDate;
	}

	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}
}
