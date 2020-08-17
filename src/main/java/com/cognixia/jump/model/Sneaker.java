package com.cognixia.jump.model;

import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;





@Entity

public class Sneaker implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	
	
	@Column(unique = true, nullable = false)
	String url;
	
	
	@Column(unique = true, nullable = false)
	private String shoeName;
	
	
	
	@Column(columnDefinition = "varchar(50) default 'Undecided' ")
	private String brand;
	
	
	@Column(nullable = false)
	private String colorway;
	
	@Column(nullable = false)
	private double price;
	
	@Max(14) 
	private Integer size;
	
	@ManyToOne
	@JoinColumn(name = "customer_id", referencedColumnName = "id")
	private Customer customer;
	

	
	
	public Sneaker() {
		this(-1L,"N/A", "N/A", "N/A", "N/A", 0.0, 0);
	}




	public Sneaker(long id, String url, String shoeName, String brand, String colorway, double price,
			@Max(14) Integer size) {
		super();
		this.id = id;
		this.url = url;
		this.shoeName = shoeName;
		this.brand = brand;
		this.colorway = colorway;
		this.price = price;
		this.size = size;
	}




	public long getId() {
		return id;
	}




	public void setId(long id) {
		this.id = id;
	}




	public String getUrl() {
		return url;
	}




	public void setUrl(String url) {
		this.url = url;
	}




	public String getShoeName() {
		return shoeName;
	}




	public void setShoeName(String shoeName) {
		this.shoeName = shoeName;
	}




	public String getBrand() {
		return brand;
	}




	public void setBrand(String brand) {
		this.brand = brand;
	}




	public String getColorway() {
		return colorway;
	}




	public void setColorway(String colorway) {
		this.colorway = colorway;
	}




	public double getPrice() {
		return price;
	}




	public void setPrice(double price) {
		this.price = price;
	}




	public Integer getSize() {
		return size;
	}




	public void setSize(Integer size) {
		this.size = size;
	}




	public static long getSerialversionuid() {
		return serialVersionUID;
	}




	@Override
	public String toString() {
		return "Sneaker [id=" + id + ", url=" + url + ", shoeName=" + shoeName + ", brand=" + brand + ", colorway="
				+ colorway + ", price=" + price + ", size=" + size + "]";
	}
	
	
	
}