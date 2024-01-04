package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entity.State;
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepo extends JpaRepository<State, Integer>{
	List<State> findByCountryCode(@Param("code") String code);
}
