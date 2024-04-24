package com.example.accounts.service;
import com.example.accounts.dto.CustomerDto;
import com.example.accounts.entity.Accounts;
import com.example.accounts.entity.Customer;

public interface IAccountService {
	public  void createAccount(CustomerDto customerDto);
	CustomerDto fetchAccount(String mobileNumber);
	boolean updateAccount(CustomerDto customerDto);
	boolean deleteAccount(String mobileNumber);
}
