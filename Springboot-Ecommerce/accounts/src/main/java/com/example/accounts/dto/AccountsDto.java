package com.example.accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Schema(
		name="Account",
		description = "Schema to hold  Account Information"
		)
public class AccountsDto {
	@Schema(
			description = "Account Number of Eazy Bank account"
			)
	@NotEmpty(message = "Account number can not be null or empty")
	@Pattern(regexp="(^$|[0-9]{10})",message = "account number must be 10 digits")
	private Long account_number;
	@Schema(
			description = "Account type of Eazy Bank account",
			example = "savings"
			)
	@NotEmpty(message = "account type can not be null or empty")
	private String account_type;
	@Schema(
			description = "branch address of Eazy Bank account"
			)
	@NotEmpty(message = "branch address  can not be null or empty")
	private String branch_address;
}