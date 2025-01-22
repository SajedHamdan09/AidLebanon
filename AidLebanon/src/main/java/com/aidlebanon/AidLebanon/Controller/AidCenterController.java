package com.aidlebanon.AidLebanon.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aidlebanon.AidLebanon.Entity.AidCenter;
import com.aidlebanon.AidLebanon.Repository.AidCenterRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/aidcenter")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from your frontend
public class AidCenterController {

	@Autowired
	private AidCenterRepository aidCenterRepository;

	// CREATE: Add a new AidCenter
	@PostMapping("/create")
	public ResponseEntity<AidCenter> createAidCenter(@RequestBody AidCenter aidCenter) {
		try {
			AidCenter savedAidCenter = aidCenterRepository.save(aidCenter);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedAidCenter);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// READ: Get AidCenter by ID
	@GetMapping("/{id}")
	public ResponseEntity<AidCenter> getAidCenterById(@PathVariable Integer id) {
		return aidCenterRepository.findById(id).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	// READ: Get AidCenter by Name
	@GetMapping("/name/{name}")
	public ResponseEntity<AidCenter> getAidCenterByName(@PathVariable String name) {
		Optional<AidCenter> aidCenter = aidCenterRepository.findByName(name);
		if (aidCenter.isPresent()) {
			return new ResponseEntity<>(aidCenter.get(), HttpStatus.FOUND);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// READ: Get All AidCenters
	@GetMapping("/all")
	public ResponseEntity<List<AidCenter>> getAllAidCenters() {
		List<AidCenter> aidCenters = aidCenterRepository.findAll();
		if (aidCenters.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(aidCenters);
	}

	// UPDATE: Update AidCenter
	@PutMapping("/{id}")
	public ResponseEntity<AidCenter> updateAidCenter(@PathVariable Integer id,
			@RequestBody AidCenter updatedAidCenter) {
		return aidCenterRepository.findById(id).map(existingAidCenter -> {
			existingAidCenter.setName(updatedAidCenter.getName());
			existingAidCenter.setLicense(updatedAidCenter.getLicense());
			existingAidCenter.setLocation(updatedAidCenter.getLocation());
			existingAidCenter.setContactInfo(updatedAidCenter.getContactInfo());
			aidCenterRepository.save(existingAidCenter);
			return ResponseEntity.ok(existingAidCenter);
		}).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	@PutMapping("/name/{name}")
	public ResponseEntity<AidCenter> updateAidCenterByName(@PathVariable String name,
			@RequestBody AidCenter updatedAidCenter) {
		Optional<AidCenter> existingAidCenterOpt = aidCenterRepository.findByName(name);
		if (existingAidCenterOpt.isPresent()) {
			AidCenter existingAidCenter = existingAidCenterOpt.get();
			existingAidCenter.setName(updatedAidCenter.getName());
			existingAidCenter.setLicense(updatedAidCenter.getLicense());
			existingAidCenter.setLocation(updatedAidCenter.getLocation());
			existingAidCenter.setContactInfo(updatedAidCenter.getContactInfo());
			aidCenterRepository.save(existingAidCenter);
			return ResponseEntity.ok(existingAidCenter);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	// DELETE: Delete AidCenter by ID
	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<Void> deleteAidCenterById(@PathVariable Integer id) {
		if (aidCenterRepository.existsById(id)) {
			aidCenterRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	// DELETE: Delete AidCenter by Name
	@DeleteMapping("/deleteByName/{name}")
	public ResponseEntity<Void> deleteAidCenterByName(@PathVariable String name) {
		Optional<AidCenter> aidCenter = aidCenterRepository.findByName(name);
		if (aidCenter.isPresent()) {
			aidCenterRepository.deleteById(aidCenter.get().getCenterId());
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
