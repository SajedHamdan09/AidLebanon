package com.aidlebanon.AidLebanon.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aidlebanon.AidLebanon.Entity.Donate;
import com.aidlebanon.AidLebanon.Repository.DonateRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donates")
public class DonateController {

	@Autowired
	private DonateRepository donateRepository;

	// Get all donations
	@GetMapping
	public List<Donate> getAllDonations() {
		return donateRepository.findAll();
	}

	// Get donation by ID
	@GetMapping("/{id}")
	public ResponseEntity<Donate> getDonationById(@PathVariable("id") int id) {
		Optional<Donate> donation = donateRepository.findById(id);
		if (donation.isPresent()) {
			return ResponseEntity.ok(donation.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Create a new donation
	@PostMapping
	public Donate createDonation(@RequestBody Donate donate) {
		return donateRepository.save(donate);
	}

	// Update an existing donation
	@PutMapping("/{id}")
	public ResponseEntity<Donate> updateDonation(@PathVariable("id") int id, @RequestBody Donate donate) {
		Optional<Donate> existingDonation = donateRepository.findById(id);
		if (existingDonation.isPresent()) {
			donate.setDonate(id); // Ensure the ID is set
			return ResponseEntity.ok(donateRepository.save(donate));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Delete a donation
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDonation(@PathVariable("id") int id) {
		if (donateRepository.existsById(id)) {
			donateRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
