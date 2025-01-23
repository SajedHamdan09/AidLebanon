package com.aidlebanon.AidLebanon.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aidlebanon.AidLebanon.Entity.Service;
import com.aidlebanon.AidLebanon.Repository.ServiceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

	@Autowired
	private ServiceRepository serviceRepository;

	@PostMapping
	public ResponseEntity<?> createService(@RequestBody Service service) {
		System.out.println("Received Service: " + service); // Check the received object

		// Check if centerId is not null
		if (service.getAidCenter().getCenterId() == null) {
			return ResponseEntity.badRequest().body("centerId is required");
		}

		try {
			// Save the service object using the repository
			serviceRepository.save(service);
			return ResponseEntity.status(HttpStatus.CREATED).body(service);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving service");
		}
	}

	@GetMapping
	public List<Service> getAllServices() {
		return serviceRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Service> getServiceById(@PathVariable Integer id) {
		return serviceRepository.findById(id).map(service -> ResponseEntity.ok().body(service))
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteService(@PathVariable Integer id) {
		if (!serviceRepository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		serviceRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
