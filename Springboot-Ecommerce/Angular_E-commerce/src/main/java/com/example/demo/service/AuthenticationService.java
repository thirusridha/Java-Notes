package com.example.demo.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepo;
import com.example.demo.entity.AuthenticationResponse;
import com.example.demo.entity.Customer;

@Service
public class AuthenticationService {
	private final CustomerRepo customerRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthenticationService(CustomerRepo customerRepo, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {
		this.customerRepo = customerRepo;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	public AuthenticationResponse register(Customer request) {
		Customer customer = new Customer();
		customer.setFirstName(request.getFirstName());
		customer.setLastName(request.getLastName());
		customer.setUsername(request.getUsername());
		customer.setEmail(request.getEmail());
		customer.setLocation(request.getLocation());
		customer.setAge(request.getAge());
		customer.setGender(request.getGender());
		customer.setPassword(passwordEncoder.encode(request.getPassword()));
		customer.setRole(request.getRole());
		customer = customerRepo.save(customer);
		String token = jwtService.generateToken(customer);
		return new AuthenticationResponse(token);
	}

	public AuthenticationResponse authenticate(Customer request) {
		String data=request.getPassword();
		System.out.println(data);
		String name=request.getUsername();
		System.out.println(name);
		 try {
	            authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
	        } catch (AuthenticationException e) {
	            // Handle authentication failure, e.g., log the error or return an error response.
	            throw new RuntimeException("Authentication failed: " + e.getMessage());
	        }
		Customer user=customerRepo.findByUsername(request.getUsername()).orElseThrow();
		String token = jwtService.generateToken(user);
		return new AuthenticationResponse(token);

	}

}
