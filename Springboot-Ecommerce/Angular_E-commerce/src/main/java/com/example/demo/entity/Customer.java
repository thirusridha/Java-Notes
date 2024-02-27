package com.example.demo.entity;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@Table
@Entity 
@ToString
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String location;
	private Integer age;
	private String gender;
	private String password;
//	@OneToMany(mappedBy = "cus",cascade = CascadeType.ALL)
//	private Set<Order> orders = new HashSet<>();
//	
//	public void add(Order order) {
//		System.out.println(order);
//		if(order!=null) {
//			if(orders == null) {
//				orders=new HashSet<>();
//				System.out.println(orders);
//			}
//			System.out.println(order);
//			 if (!orders.contains(order)) {
//			        orders.add(order);
//			        order.setCus(this); // Set the customer on the order
//			    }else {
//		            System.out.println("Order already belongs to this customer. Avoiding recursive loop.");
//		        }
//		}else {
//			System.out.println("failed");
//		}
//	}
}
