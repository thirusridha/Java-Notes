package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CustomerRepo;
import com.example.demo.entity.Customer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SaveCustomerImpl implements SaveCustomerService {
	@Autowired
	private CustomerRepo customerRepo;

	@Override
	public String saveCustomer(Customer customer) {
		String json;
		try {
			customerRepo.save(customer);
			ObjectMapper objectMapper = new ObjectMapper();
			json = objectMapper.writeValueAsString(customer);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return e.getMessage();

		}

		return json;

	}

}
