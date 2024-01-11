package com.example.demo.service;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepo;
import com.example.demo.dto.Purchase;
import com.example.demo.dto.PurchaseResponse;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;

import jakarta.transaction.Transactional;
import lombok.ToString;
@Service
public class CheckoutServiceIml  implements CheckoutService{
	@Autowired	
	private CustomerRepo customerRepo;
	public CheckoutServiceIml(CustomerRepo customerRepo) {
		this.customerRepo=customerRepo;
	}
	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		Set<Order> o=new HashSet<>();
		Order order=purchase.getOrder();
		String orderTrackingNumber=generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);
		Set<OrderItem> orderItems=purchase.getOrderItems();
//		order.setOrderItems(orderItems);
		orderItems.forEach(item->order.add(item));
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());
		Customer customer=purchase.getCustomer();
//		o.add(order);
		System.out.println(order);
		customer.add(order);
		System.out.println(customer);
//		System.out.println(order.getOrderItems());
//		System.out.println(customer);
//		System.out.println(order);
//		customer.add(order);
		customerRepo.save(customer);
		return new PurchaseResponse(orderTrackingNumber);
	}
	private String generateOrderTrackingNumber() {
		return UUID.randomUUID().toString();
	}

}
