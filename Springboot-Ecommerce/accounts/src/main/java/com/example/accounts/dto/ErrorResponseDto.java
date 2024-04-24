package com.example.accounts.dto;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Schema(
		name="ErrorResponse",
		description = "Schema to hold  Error response Information"
		)
public class ErrorResponseDto {
	@Schema(
			description = "API path invoked by the client"
			)
	private String apiPath;
	@Schema(
			description = "Error code representing the error happend"
			)
	private HttpStatus errorCode;
	@Schema(
			description = "Error message representing the error happend"
			)
	private String errorMessage;
	@Schema(
			description = "Error time representing the error happend"
			)
	private LocalDateTime errorTime;
}
