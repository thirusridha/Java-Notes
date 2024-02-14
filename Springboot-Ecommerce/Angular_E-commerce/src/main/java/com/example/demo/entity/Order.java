package com.example.demo.entity;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@Table(name="orders")
@Entity
@ToString 
public class Order {
	@Id													
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String orderTrackingNumber;
	private int totalQuantity;
	private BigDecimal totalPrice;
	private String status;
	@CreationTimestamp
	private Date dateCreated;
	@UpdateTimestamp
	private Date lastUpdated;
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customer cus;
	@OneToOne(cascade =CascadeType.ALL)
	@JoinColumn(name = "shipping_address_id",referencedColumnName = "id")
	private Address shippingAddress;
	@OneToOne(cascade =CascadeType.ALL)
	@JoinColumn(name = "billing_address_id",referencedColumnName = "id")
	private Address billingAddress;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
	private Set<OrderItem> orderItems = new HashSet<>();
	@Override
	public boolean equals(Object o) {
	    if (this == o) return true;
	    if (o == null || getClass() != o.getClass()) return false;
	    // Add comparison logic based on unique identifiers
	    // For example, compare 'id' fields
	    return Objects.equals(id, ((Order) o).id);
	}

	@Override
	public int hashCode() {
	    return Objects.hash(id);
	}
//	public void add(OrderItem item) {
//		if(orderItems!=null) {
//			if(orderItems == null) {
//				orderItems=new HashSet<>();
//				System.out.println(orderItems);
//			}
//			 if (!orderItems.contains(item)) {
//				 orderItems.add(item);
//			        item.setOrder(this); // Set the customer on the order
//			    }else {
//		            System.out.println("Order already belongs to this customer. Avoiding recursive loop.");
//		        }
//		}else {
//			System.out.println("failed");
//		}
//	}
	
}
