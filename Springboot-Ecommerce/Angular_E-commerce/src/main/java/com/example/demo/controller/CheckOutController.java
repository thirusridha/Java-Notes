package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.Purchase;
import com.example.demo.dto.PurchaseResponse;
import com.example.demo.service.CheckoutService;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/checkout")
public class CheckOutController {
	@Autowired
	private  CheckoutService checkoutService ;
	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
			PurchaseResponse purchaseResponse =checkoutService.placeOrder(purchase);
			return purchaseResponse;
	}
}