package com.example.demo.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.Purchase;
import com.example.demo.dto.PurchaseResponse;
import com.example.demo.entity.AuthenticationResponse;
import com.example.demo.entity.Customer;
import com.example.demo.service.AuthenticationService;
import com.example.demo.service.CheckoutService;
import com.example.demo.service.SaveCustomerService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/checkout")
public class CheckOutController {
	private final CheckoutService checkoutService;
	private final SaveCustomerService saveCustomerService;
	private final AuthenticationService authenticationService;
	
public CheckOutController(CheckoutService checkoutService, SaveCustomerService saveCustomerService,
			AuthenticationService authenticationService) {
		this.checkoutService = checkoutService;	
		this.saveCustomerService = saveCustomerService;
		this.authenticationService = authenticationService;
	}

	@PostMapping("/purchase/{id}")
	public PurchaseResponse placeOrder(@RequestBody Purchase purchase,@PathVariable Integer id){
			PurchaseResponse purchaseResponse= checkoutService.placeOrder(purchase,id);
			 return purchaseResponse;
	}
	@PostMapping("/save-customer")
	public String saveCustomer(@RequestBody Customer customer	) {
		return saveCustomerService.saveCustomer(customer);
		
	}
//	@PostMapping("/register")
//	public ResponseEntity<AuthenticationResponse> register(@RequestBody Customer request){
//		return ResponseEntity.ok(authenticationService.register(request));
//		
//	}
//	@PostMapping("/login")
//	public ResponseEntity<AuthenticationResponse> login(@RequestBody Customer request){
//		return ResponseEntity.ok(authenticationService.authenticate(request));
//		
//	}

	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody Customer request){
		return ResponseEntity.ok(authenticationService.register(request));
		
	}
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody Customer request){
		return ResponseEntity.ok(authenticationService.authenticate(request));
		
	}
}