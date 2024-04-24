package com.example.accounts.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.accounts.constants.AccountsConstants;
import com.example.accounts.dto.CustomerDto;
import com.example.accounts.dto.ErrorResponseDto;
import com.example.accounts.dto.ResponseDto;
import com.example.accounts.service.IAccountService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;

@Tag(name = "CRUD REST APIs for Accounts", description = "CRUD REST APIs to create fetch update and delelte the account details")
@RestController
@RequestMapping(path = "/api", produces = { MediaType.APPLICATION_JSON_VALUE })
@AllArgsConstructor
@Validated
public class AccountController {
//	@Autowired
	private IAccountService accountService;

	@Operation(summary = "Create Account REST API", description = "REST API to create a new customer and account")
	@ApiResponse(responseCode = "201", description = "HTTP Status created")
	@PostMapping("/create")
	public ResponseEntity<ResponseDto> createAccount(@Valid @RequestBody CustomerDto customerDto) {
		accountService.createAccount(customerDto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ResponseDto(AccountsConstants.STATUS_201, AccountsConstants.MESSAGE_201));
	}

	@Operation(summary = "Fetch Account REST API", description = "REST API to fetch a customer and account")
	@ApiResponse(responseCode = "200", description = "HTTP Status Ok")
	@GetMapping("/fetch")
	public ResponseEntity<CustomerDto> fetchAccountDetatils(
			@Pattern(regexp = "(^$|[0-9]{10})", message = "mobile number must be 10 digits") @RequestParam String mobileNumber) {
		CustomerDto customerDto = accountService.fetchAccount(mobileNumber);
		return ResponseEntity.status(HttpStatus.OK).body(customerDto);
	}

	@Operation(summary = "Update Account REST API", description = "REST API to update  customer and account")
	@ApiResponses({ @ApiResponse(responseCode = "201", description = "HTTP Status created"),
			@ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
			content = @Content(
					schema = @Schema(implementation = ErrorResponseDto.class))),		
	})

	@PutMapping("/update")
	public ResponseEntity<ResponseDto> updateAccountDetails(@Valid @RequestBody CustomerDto customerDto) {
		boolean isUpdated = accountService.updateAccount(customerDto);
		if (isUpdated) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseDto(AccountsConstants.STATUS_200, AccountsConstants.MESSAGE_200));
		} else {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new ResponseDto(AccountsConstants.STATUS_417, AccountsConstants.MESSAGE_417_UPDATE));
		}
	}

	@Operation(summary = "Delete Account REST API", description = "REST API to delete a new customer and account based on a mobile number")
	@ApiResponses({ @ApiResponse(responseCode = "201", description = "HTTP Status created"),
			@ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error") })
	@DeleteMapping("/delete")
	public ResponseEntity<ResponseDto> deleteAccountDetails(
			@Pattern(regexp = "(^$|[0-9]{10})", message = "mobile number must be 10 digits") @RequestParam String mobileNumber) {
		boolean isDeleted = accountService.deleteAccount(mobileNumber);
		if (isDeleted) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseDto(AccountsConstants.STATUS_200, AccountsConstants.MESSAGE_200));
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseDto(AccountsConstants.STATUS_500, AccountsConstants.MESSAGE_500));
		}
	}
}