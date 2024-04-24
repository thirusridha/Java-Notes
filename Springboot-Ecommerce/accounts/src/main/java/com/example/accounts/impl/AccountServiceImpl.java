package com.example.accounts.impl;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.accounts.constants.AccountsConstants;
import com.example.accounts.dto.AccountsDto;
import com.example.accounts.dto.CustomerDto;
import com.example.accounts.entity.Accounts;
import com.example.accounts.entity.Customer;
import com.example.accounts.exception.CustomerAlreadyExistException;
import com.example.accounts.exception.ResourceNotFoundException;
import com.example.accounts.mapper.AccountsMapper;
import com.example.accounts.mapper.CustomerMapper;
import com.example.accounts.repo.AccountsRepo;
import com.example.accounts.repo.CustomerRepo;
import com.example.accounts.service.IAccountService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements IAccountService {
	@Autowired
	private AccountsRepo accountsRepo;
	@Autowired
	private CustomerRepo customerRepo;

	@Override
	public void createAccount(CustomerDto customerDto) {
		Customer customer = CustomerMapper.mapToCustomer(new Customer(), customerDto);
		Optional<Customer> optionalCustomer = customerRepo.findByMobileNumber(customerDto.getMobileNumber());

		if (optionalCustomer.isPresent()) {
			throw new CustomerAlreadyExistException(
					"Customer already registered with given mobileNumber " + customerDto.getMobileNumber());
		}
//		customer.setCreatedAt(LocalDateTime.now());
//		customer.setCreatedBy("Sridhar");
		System.out.println(customer);
		Customer savedCustomer = customerRepo.save(customer);
		accountsRepo.save(createNewAccount(savedCustomer));
	}

	public Accounts createNewAccount(Customer customer) {
		Accounts newAccount = new Accounts();
		newAccount.setCustomerId(customer.getCustomerId());
		long randomAccNumber = 1000000000L + new Random().nextInt(900000000);
//		newAccount.setCreatedAt(LocalDateTime.now());
//		newAccount.setCreatedBy("Sridhar");
		newAccount.setAccountNumber(randomAccNumber);
		newAccount.setAccountType((AccountsConstants.SAVINGS));
		newAccount.setBranchAddress((AccountsConstants.ADDRESS));
		return newAccount;
	}

	@Override
	public CustomerDto fetchAccount(String mobileNumber) {
		Customer customer = customerRepo.findByMobileNumber(mobileNumber)
				.orElseThrow(() -> new ResourceNotFoundException("customer", "mobileNumber", mobileNumber));
		Accounts accounts = accountsRepo.findByCustomerId(customer.getCustomerId()).orElseThrow(
				() -> new ResourceNotFoundException("account", "customerId", customer.getCustomerId().toString()));
		CustomerDto customerDto = CustomerMapper.mapToCustomerDto(customer, new CustomerDto());
		customerDto.setAccountsDto(AccountsMapper.mapToAccountsDto(accounts, new AccountsDto()));
		return customerDto;
	}

	@Override
	public boolean updateAccount(CustomerDto customerDto) {
		boolean isUpdated = false;
		AccountsDto accoutsDto = customerDto.getAccountsDto();
		if (accoutsDto != null) {
			Accounts accounts = accountsRepo.findById(accoutsDto.getAccount_number())
					.orElseThrow(() -> new ResourceNotFoundException("Acccount", "AccountNumber",
							accoutsDto.getAccount_number().toString()));
			AccountsMapper.mapToAccounts(accounts, accoutsDto);
			accounts = accountsRepo.save(accounts);
			Long customerId = accounts.getCustomerId();
			Customer customer = customerRepo.findById(customerId)
					.orElseThrow(() -> new ResourceNotFoundException("Customer", "CustomerId",
							customerId.toString()));
			CustomerMapper.mapToCustomer(customer, customerDto);
			customerRepo.save(customer);
			isUpdated=true;
		}

		
		return isUpdated;
	}

	@Override
	public boolean deleteAccount(String mobileNumber) {
		Customer customer = customerRepo.findByMobileNumber(mobileNumber)
				.orElseThrow(() -> new ResourceNotFoundException("customer", "mobileNumber", mobileNumber));
				accountsRepo.deleteByCustomerId(customer.getCustomerId());
				customerRepo.deleteById(customer.getCustomerId());
		return true;
	}
}