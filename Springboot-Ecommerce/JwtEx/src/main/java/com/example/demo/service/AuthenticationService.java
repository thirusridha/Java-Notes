package com.example.demo.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.AuthenticationResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepo;

@Service
public class AuthenticationService {
	private final UserRepo userRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthenticationService(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	public AuthenticationResponse register(User request) {
//		User user = new User();
//		user.setFirstName(request.getFirstName());
//		user.setLastName(request.getLastName());
//		user.setUsername(request.getUsername());
//		user.setPassword(passwordEncoder.encode(request.getPassword()));
//		user.setRole(request.getRole());
//		user = userRepo.save(user);
		request.setPassword(passwordEncoder.encode(request.getPassword()));
		
		String token = jwtService.generateToken(userRepo.save(request));
		return new AuthenticationResponse(token);
	}

	public AuthenticationResponse authenticate(User request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		User user=userRepo.findByUsername(request.getUsername()).orElseThrow();
		String token = jwtService.generateToken(user);
		return new AuthenticationResponse(token);

	}

}
