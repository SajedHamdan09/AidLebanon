package com.aidlebanon.AidLebanon.Controller;

import com.aidlebanon.AidLebanon.Entity.Follow;
import com.aidlebanon.AidLebanon.Entity.User;
import com.aidlebanon.AidLebanon.Entity.AidCenter;
import com.aidlebanon.AidLebanon.Repository.FollowRepository;
import com.aidlebanon.AidLebanon.Repository.UserRepository;
import com.aidlebanon.AidLebanon.Repository.AidCenterRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
public class FollowController {

	@Autowired
	private FollowRepository followRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AidCenterRepository aidCenterRepository;

	// CREATE: Follow a specific Aid Center
	@PostMapping("/create")
	public ResponseEntity<Follow> createFollow(@RequestBody Follow follow) {
		try {
			// Fetch user and center by id
			User user = userRepository.findById(follow.getUser().getUserId())
					.orElseThrow(() -> new RuntimeException("User not found"));
			AidCenter aidCenter = aidCenterRepository.findById(follow.getAidCenter().getCenterId())
					.orElseThrow(() -> new RuntimeException("Aid Center not found"));

			// Set user and center in follow entity
			follow.setUser(user);
			follow.setAidCenter(aidCenter);

			// Save the follow record
			Follow savedFollow = followRepository.save(follow);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedFollow);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}

	// READ: Get all follows
	@GetMapping("/all")
	public ResponseEntity<List<Follow>> getAllFollows() {
		List<Follow> follows = followRepository.findAll();
		return ResponseEntity.ok(follows);
	}

	// DELETE: Delete a follow by userId and centerId
	@DeleteMapping("/delete/{userId}/{centerId}")
	public ResponseEntity<Void> deleteFollow(@PathVariable int userId, @PathVariable int centerId) {
		try {
			// Try to find the follow by userId and centerId
			Follow follow = followRepository.findByUser_UserIdAndAidCenter_CenterId(userId, centerId)
					.orElseThrow(() -> new RuntimeException("Follow not found"));

			// Delete the found follow
			followRepository.delete(follow);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			// If not found or any error occurs, return NOT_FOUND status
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

}
