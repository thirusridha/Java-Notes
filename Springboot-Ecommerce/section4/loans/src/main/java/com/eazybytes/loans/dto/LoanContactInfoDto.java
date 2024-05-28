package com.eazybytes.loans.dto;
import java.util.*;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;
@ConfigurationProperties(prefix="loans")
@Getter
@Setter
public class LoanContactInfoDto{
	private String message;
	private Map<String, String> contactDetails;
}