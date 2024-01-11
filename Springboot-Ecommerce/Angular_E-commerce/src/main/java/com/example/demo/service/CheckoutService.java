package com.example.demo.service;
import com.example.demo.dto.Purchase;
import com.example.demo.dto.PurchaseResponse;
//@Service
public interface CheckoutService {
	PurchaseResponse placeOrder(Purchase purchase);
}
