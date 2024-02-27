package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.Country;
@CrossOrigin("http://localhost:4200/products")
@RepositoryRestResource(collectionResourceRel = "countries",path = "countries")
public interface CountryRepo extends JpaRepository<Country, Integer>{

}
