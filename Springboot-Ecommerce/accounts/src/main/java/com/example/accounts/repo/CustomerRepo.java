package com.example.accounts.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.accounts.entity.Customer;
@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long>{

	Optional<Customer> findByMobileNumber(String string);

}
