package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class DemoController {
	@GetMapping("/demo")
	public ResponseEntity<String> demo(){
		return ResponseEntity.ok("Hello from secured url...");
	}
	
	@GetMapping("/admin")
	public ResponseEntity<String> demoAdmin(){
		return ResponseEntity.ok("Hello from secured url...admin-only :)");
	}
}
