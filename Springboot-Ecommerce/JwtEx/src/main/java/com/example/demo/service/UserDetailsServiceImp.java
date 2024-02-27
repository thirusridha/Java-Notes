package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.repository.UserRepo;
@Service
public class UserDetailsServiceImp implements UserDetailsService{
	private final UserRepo userRepo;
	public UserDetailsServiceImp(UserRepo userRepo) {
		this.userRepo=userRepo;
	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return userRepo.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User not found"));
	}

}
