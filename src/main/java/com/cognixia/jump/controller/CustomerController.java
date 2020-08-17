package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Customer;
import com.cognixia.jump.repository.CustomerRepository;

@RequestMapping("/api")
@RestController
public class CustomerController {
	@Autowired
	CustomerRepository service;
	
	@GetMapping("/customer/{id}")
	public Customer getCustomer(@PathVariable long id) {
		
		Optional<Customer> found = service.findById(id);
		
		if(found.isPresent()) {
			return found.get();
		}
		else {
			return new Customer();
		}
	}
	
	@GetMapping("/customer")
	public List<Customer> getAllCustomers() {
		
		return service.findAll();
	}
	
	@PostMapping("/add/customer")
	public void addCustomer(@Valid @RequestBody Customer customer) {
		
		customer.setId(-1L);
		
		service.save(customer);
	}

	@PutMapping("/update/customer")
	public void updateCustomer(@Valid @RequestBody Customer customer) {
		
		if(service.existsById(customer.getId())) {
			service.save(customer);
		}
		
	}
	
}
