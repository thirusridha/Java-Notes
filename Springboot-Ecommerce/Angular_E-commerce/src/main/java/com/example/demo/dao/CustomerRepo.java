package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.Customer;
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface CustomerRepo extends JpaRepository<Customer,Long> {
	Customer findByEmailAndPassword(@Param("email") String code,@Param("password") String password);
}
