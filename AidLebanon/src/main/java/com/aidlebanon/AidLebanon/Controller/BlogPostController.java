package com.aidlebanon.AidLebanon.Controller;

import com.aidlebanon.AidLebanon.Entity.BlogPost;
import com.aidlebanon.AidLebanon.Repository.BlogPostRepository;
import com.aidlebanon.AidLebanon.Entity.AidCenter;
import com.aidlebanon.AidLebanon.Repository.AidCenterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/blogpost")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from your frontend
public class BlogPostController {

	@Autowired
	private BlogPostRepository blogPostRepository;

	@Autowired
	private AidCenterRepository aidCenterRepository;

	// CREATE: Add a new BlogPost
	@PostMapping("/create")
	public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
		try {
			Optional<AidCenter> aidCenterOpt = aidCenterRepository.findById(blogPost.getAidCenter().getCenterId());

			if (aidCenterOpt.isPresent()) {
				blogPost.setAidCenter(aidCenterOpt.get());
				BlogPost savedBlogPost = blogPostRepository.save(blogPost);
				return ResponseEntity.status(HttpStatus.CREATED).body(savedBlogPost);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// READ: Get All BlogPosts for a specific AidCenter
	@GetMapping("/center/{aidCenterId}")
	public ResponseEntity<List<BlogPost>> getBlogPostsByAidCenter(@PathVariable Integer aidCenterId) {
		Optional<AidCenter> aidCenterOpt = aidCenterRepository.findById(aidCenterId);

		if (aidCenterOpt.isPresent()) {
			List<BlogPost> blogPosts = blogPostRepository.findByAidCenter(aidCenterOpt.get());
			if (blogPosts.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			}
			return ResponseEntity.ok(blogPosts);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	// NEW: Get All BlogPosts
	@GetMapping("/all")
	public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
		List<BlogPost> blogPosts = blogPostRepository.findAll();
		if (blogPosts.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(blogPosts);
	}

	// DELETE: Delete BlogPost by ID
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteBlogPost(@PathVariable Integer id) {
		if (blogPostRepository.existsById(id)) {
			blogPostRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
