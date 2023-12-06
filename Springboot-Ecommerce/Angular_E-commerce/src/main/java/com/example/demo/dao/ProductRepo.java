package com.example.demo.dao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.demo.entity.Product;
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel="product",path="products")
public interface ProductRepo extends JpaRepository<Product, Long>{		
	Page<Product> findByCategoryId(@Param("id") Long id,Pageable pageable);
} 