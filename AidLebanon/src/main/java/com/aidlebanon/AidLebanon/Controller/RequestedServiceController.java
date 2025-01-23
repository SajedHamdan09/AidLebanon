package com.aidlebanon.AidLebanon.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aidlebanon.AidLebanon.Entity.RequestedService;
import com.aidlebanon.AidLebanon.Repository.RequestedServiceRepository;

@RestController
@RequestMapping("/api/request-services")
public class RequestedServiceController {

	@Autowired
	private RequestedServiceRepository requestServiceRepository;

	@PostMapping
	public ResponseEntity<RequestedService> createRequestService(@RequestBody RequestedService requestService) {
		RequestedService savedRequest = requestServiceRepository.save(requestService);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
	}

	@GetMapping
	public List<RequestedService> getAllRequestServices() {
		return requestServiceRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<RequestedService> getRequestServiceById(@PathVariable Integer id) {
		return requestServiceRepository.findById(id).map(request -> ResponseEntity.ok().body(request))
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRequestService(@PathVariable Integer id) {
		requestServiceRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
