package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.AuthenticationResponse;
import com.example.demo.entity.User;
import com.example.demo.service.AuthenticationService;

@RestController
public class AuthenticationController {
	private final AuthenticationService authenticationService;

	public AuthenticationController(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody User request){
		return ResponseEntity.ok(authenticationService.register(request));
		
	}
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody User request){
		return ResponseEntity.ok(authenticationService.authenticate(request));
		
	}
}
