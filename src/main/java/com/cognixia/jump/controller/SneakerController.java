package com.cognixia.jump.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Sneaker;
import com.cognixia.jump.repository.SneakerRepository;

import java.util.Optional;




@RequestMapping("/api")
@RestController
public class SneakerController {
	
	@Autowired
	SneakerRepository service;

	@GetMapping("/sneakers")
	public List<Sneaker> getAllSneakers(){
		
		return service.findAll();
	}
	@GetMapping("/sneaker/{id}")
	public Sneaker getSneaker(@PathVariable long id) {
		
		Optional<Sneaker> sneaker= service.findById(id);
		
		if(sneaker.isPresent()) {
			return sneaker.get();
		}
		return new Sneaker();
	}
	@PostMapping("/add/sneaker")
	public void addSneaker(@RequestBody Sneaker newSneaker) {
		
		newSneaker.setId(-1L);
		
		Sneaker added= service.save(newSneaker); // save() does an insert or update
		
		System.out.println("Added: =" + added);
	}
	
	@PutMapping("/update/sneaker")
	public @ResponseBody String updateSneaker(@RequestBody Sneaker updateSneaker) {
		
	// check if student exists, then update them
		Optional<Sneaker> found= service.findById(updateSneaker.getId());
		
		if(found.isPresent()) {
			service.save(updateSneaker);
			return "Saved: " + updateSneaker.toString();
		}
		else {
			return "Could not update student, the id = " + updateSneaker.getId() + " doesn't exsists";
		}
	}
	
	
		
		@PatchMapping("/update/sneaker/brands")
		public @ResponseBody String updateBrands(@RequestBody Map<String, String> brandInfo) {
			
			long id= Long.parseLong(brandInfo.get("id"));
			
			String brand =brandInfo.get("brand");
			
			Optional<Sneaker> found= service.findById(id);
			
			if(found.isPresent()) {
				Sneaker toUpdate = found.get();
				String old = toUpdate.getBrand();
				toUpdate.setBrand(brand);
				service.save(toUpdate);
				
				return "Old Brand: " + old + "\nNew Brand: " + brand;
			}
			else {
				return "Could not update brand, sneaker with id = " + id + " doesn't exist";
							
				}
	}
		@GetMapping("/sneakers/brands/{brand}")
		public List<Sneaker> isSameBrand(@PathVariable String brand) {
			
			return service.sneakerBySameBrand(brand);
		}
		
		@GetMapping("/sneakers/sizes/{size}")
		public List<Sneaker> isSameSize(@PathVariable String size) {
			
			return service.sneakerBySameSize(size);
		}
		
		@DeleteMapping("/delete/sneaker/{id}")
		public ResponseEntity<String> deleteSneaker(@PathVariable long id){
			
			Optional<Sneaker> found=service.findById(id);
			
			if(found.isPresent()) {
				service.deleteById(id);
				return ResponseEntity.status(200).body("Deleted sneaker with id = " + id);
				
			}
			else {
				return ResponseEntity.status(400)
						.header("Sneaker id", id + "")
						.body("Sneaker with id = " + id + " not found"); 
			}
		}
		
}
