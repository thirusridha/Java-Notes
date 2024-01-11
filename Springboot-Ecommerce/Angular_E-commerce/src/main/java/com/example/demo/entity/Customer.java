package com.example.demo.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import ch.qos.logback.core.encoder.ByteArrayUtil;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table
@Entity
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
	private Set<Order> orders;
	public void add(Order order) {
		System.out.println(order);
		if(order!=null) {
			if(orders == null) {
				orders=new HashSet<>();
			}
			orders.add(order);
			order.setCustomer(this);
		}
	}
}
