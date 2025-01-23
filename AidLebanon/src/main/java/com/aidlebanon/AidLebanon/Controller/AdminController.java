package com.aidlebanon.AidLebanon.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aidlebanon.AidLebanon.Entity.Admin;
import com.aidlebanon.AidLebanon.Entity.AdminId;
import com.aidlebanon.AidLebanon.Repository.AdminRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminRepository adminRepository;

	@PostMapping("/createAdmin")
	public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
		System.out.println("Received request to create admin: " + admin);
		try {
			Admin savedAdmin = adminRepository.save(admin);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}

	// READ: Get data for a specific admin by Username and Password
	@GetMapping("/{username}/{password}")
	public ResponseEntity<Admin> getAdmin(@PathVariable String username, @PathVariable String password) {
		AdminId adminId = new AdminId();
		adminId.setUsername(username);
		adminId.setPassword(password);

		Optional<Admin> admin = adminRepository.findById(adminId);
		return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// READ: Get all admins
	@GetMapping("/all")
	public List<Admin> getAllAdmins() {
		return adminRepository.findAll();
	}

	// UPDATE: Update admin details
	@PutMapping("/{username}/{password}")
	public ResponseEntity<Admin> updateAdmin(@PathVariable String username, @PathVariable String password,
			@RequestBody Admin updatedAdmin) {

		AdminId adminId = new AdminId();
		adminId.setUsername(username);
		adminId.setPassword(password);

		Optional<Admin> existingAdmin = adminRepository.findById(adminId);
		if (existingAdmin.isPresent()) {
			Admin admin = existingAdmin.get();
			admin.setAdminId(updatedAdmin.getAdminId()); // Set the new composite key (if needed)
			// You can update other fields here as needed

			Admin savedAdmin = adminRepository.save(admin); // Save the updated admin
			return ResponseEntity.ok(savedAdmin);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// DELETE: Delete an admin by Username and Password
	@DeleteMapping("/{username}/{password}")
	public ResponseEntity<Void> deleteAdmin(@PathVariable String username, @PathVariable String password) {
		AdminId adminId = new AdminId();
		adminId.setUsername(username);
		adminId.setPassword(password);

		if (adminRepository.existsById(adminId)) {
			adminRepository.deleteById(adminId); // Delete admin
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
