package com.aidlebanon.AidLebanon.Repository;

import com.aidlebanon.AidLebanon.Entity.BlogPost;
import com.aidlebanon.AidLebanon.Entity.AidCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Integer> {

	// Custom query to find blog posts by AidCenter
	List<BlogPost> findByAidCenter(AidCenter aidCenter);
}
