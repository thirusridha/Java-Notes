package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Product;
@RepositoryRestResource(collectionResourceRel="product",path="products")
public interface ProductRepo extends JpaRepository<Product, Long>{
	
}
