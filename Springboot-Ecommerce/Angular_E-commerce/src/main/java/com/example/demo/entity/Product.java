package com.example.demo.entity;

import java.math.BigDecimal;
import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SelectBeforeUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	@Column(name="sku")
	private String  sku;
	@Column(name="name")
	private String name;
	@Column(name="description")
	private String description;
	@Column(name="unit_price")
	private BigDecimal unitPrice;
	@Column(name="image_url")
	private String imageUrl;
	@Column(name="active")
	private boolean active;
	@Column(name="units_in_stock")
	private int unitsInStock;
	@CreationTimestamp
	@Column(name="date_created")
	private Date dateCreated;
	@UpdateTimestamp
	@Column(name="last_updated")
	private Date lastUpdated;
	@ManyToOne
	@JoinColumn(name="category_id")
	private ProductCategory category;
}
