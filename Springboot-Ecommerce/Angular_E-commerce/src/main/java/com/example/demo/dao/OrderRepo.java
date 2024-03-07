package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.Order;
@CrossOrigin("http://localhost:4200/products")
public interface OrderRepo extends JpaRepository<Order, Long>{
	
}
