package com.example.accounts.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.example.accounts.entity.Accounts;
import com.example.accounts.entity.Customer;

import jakarta.transaction.Transactional;
@Repository
public interface AccountsRepo extends JpaRepository<Accounts, Long>{
	Optional<Accounts> findByCustomerId(Long customerId);
	@Transactional
	@Modifying
	void deleteByCustomerId(Long customerId);
}
