package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;


@Entity
public class Customer implements Serializable {

	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotBlank
	String fname;
	
	@NotBlank
	String lname;
	
	@Column(unique = true)
	String email;
	
	
	
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private List<Sneaker> sneaker;
	
	
	public Customer() {
		this(-1L,"N/A","N/A","N/A", new ArrayList<Sneaker>());
	}


	public Customer(long id, @NotBlank String fname, @NotBlank String lname, String email, ArrayList<Sneaker> sneakers) {
		super();
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.sneaker = sneakers;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getFname() {
		return fname;
	}


	public void setFname(String fname) {
		this.fname = fname;
	}


	public String getLname() {
		return lname;
	}


	public void setLname(String lname) {
		this.lname = lname;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public List<Sneaker> getSneaker() {
		return sneaker;
	}


	public void setSneaker(List<Sneaker> sneaker) {
		this.sneaker = sneaker;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	@Override
	public String toString() {
		return "Customer [id=" + id + ", fname=" + fname + ", lname=" + lname + ", email=" + email + ", sneaker="
				+ sneaker + "]";
	}
	
}
