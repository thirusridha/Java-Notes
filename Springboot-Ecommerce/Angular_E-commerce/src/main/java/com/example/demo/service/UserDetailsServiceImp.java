package com.example.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepo;

@Service
public class UserDetailsServiceImp implements UserDetailsService{
	private final CustomerRepo customerRepo;
	public UserDetailsServiceImp(CustomerRepo customerRepo) {
		this.customerRepo=customerRepo;
	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return customerRepo.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User not found"));
	}

}
