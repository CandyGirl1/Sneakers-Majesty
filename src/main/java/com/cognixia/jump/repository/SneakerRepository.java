package com.cognixia.jump.repository;





import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Sneaker;


@Repository

public interface SneakerRepository extends JpaRepository<Sneaker, Long> {

	@Query("select s from Sneaker s where s.brand = ?1")
	List<Sneaker> sneakerBySameBrand(String brand);
	
	
	@Query("select s from Sneaker s where s.size = ?1")
	List<Sneaker> sneakerBySameSize(String size);
	
	}

	

	



