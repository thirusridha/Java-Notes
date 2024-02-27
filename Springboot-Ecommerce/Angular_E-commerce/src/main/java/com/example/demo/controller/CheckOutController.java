package com.example.demo.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.Purchase;
import com.example.demo.dto.PurchaseResponse;
import com.example.demo.entity.Customer;
import com.example.demo.service.CheckoutService;
import com.example.demo.service.SaveCustomerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/checkout")
public class CheckOutController {
	@Autowired
	private CheckoutService checkoutService;
	@Autowired
	private SaveCustomerService saveCustomerService;

//	@PostMapping("/purchase")
//	public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
//			PurchaseResponse purchaseResponse= checkoutService.placeOrder(purchase);
//			 return purchaseResponse;
//	}
	@PostMapping("/save-customer")
	public String saveCustomer(@RequestBody Customer customer) {
		return saveCustomerService.saveCustomer(customer);
		
	}
	
}