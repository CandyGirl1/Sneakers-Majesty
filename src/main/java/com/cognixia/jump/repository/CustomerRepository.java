package com.cognixia.jump.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognixia.jump.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
