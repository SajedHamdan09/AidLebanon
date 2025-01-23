package com.aidlebanon.AidLebanon.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aidlebanon.AidLebanon.Entity.User;
import com.aidlebanon.AidLebanon.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	// CREATE: Add a new user
	@PostMapping("/create")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User savedUser = userRepository.save(user);
		return ResponseEntity.ok(savedUser);
	}

	// READ: Get all users
	@GetMapping("/all")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// READ: Get a user by ID
	@GetMapping("/{userId}")
	public ResponseEntity<User> getUserById(@PathVariable int userId) {
		Optional<User> user = userRepository.findById(userId);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// DELETE: Remove a user by ID
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
		if (userRepository.existsById(userId)) {
			userRepository.deleteById(userId);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
