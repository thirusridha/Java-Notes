package com.example.demo.service;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dao.CustomerRepo;
import com.example.demo.dao.OrderRepo;
import com.example.demo.dto.Purchase;
import com.example.demo.dto.PurchaseResponse;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import jakarta.transaction.Transactional;
@Service
public class CheckoutServiceIml  implements CheckoutService{
	@Autowired	
	private OrderRepo orderRepo;
	@Autowired
	private CustomerRepo customerRepo;
	public CheckoutServiceIml(OrderRepo orderRepo) {
		this.orderRepo=orderRepo;
			}	
	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase,Integer id) { 
		Set<Order> set=new HashSet<>();
		
		Order order = purchase.getOrder();
		Customer customer=customerRepo.findById(id);
	    String orderTrackingNumber = generateOrderTrackingNumber();
	    order.setOrderTrackingNumber(orderTrackingNumber);
	    Set<OrderItem> orderItems = purchase.getOrderItems();
	    orderItems.forEach(item->item.setOrder(order)); 
	    order.setOrderItems(orderItems);
//	    orderItems.forEach(item->order.add(item));
	    order.setBillingAddress(purchase.getBillingAddress());
	    order.setShippingAddress(purchase.getShippingAddress());
//	    Customer customer = purchase.getCustomer();
//	    order.setCus(customer);
//	    customer.add(order);
	    order.setCustomer(customer);
	    set.add(order);
//	    customer.setOrders(set);
//	    customerRepo.save(customer); // Save the Customer first 
	    
	    orderRepo.save(order);
	    return new PurchaseResponse(orderTrackingNumber);
		
//		Set<Order> o=new HashSet<>();
//		Order order=purchase.getOrder();
//		String orderTrackingNumber=generateOrderTrackingNumber();
//		order.setOrderTrackingNumber(orderTrackingNumber);
//		Set<OrderItem> orderItems=purchase.getOrderItems();
//		order.setOrderItems(orderItems);
////		orderItems.forEach(item->order.add(item));
//		order.setBillingAddress(purchase.getBillingAddress());
//		order.setShippingAddress(purchase.getShippingAddress());
//		Customer customer=purchase.getCustomer();
//		customer.add(order);
//		customerRepo.save(customer);
//		return new PurchaseResponse(orderTrackingNumber);
	}
	private String generateOrderTrackingNumber() {
		return UUID.randomUUID().toString();
	}

}
