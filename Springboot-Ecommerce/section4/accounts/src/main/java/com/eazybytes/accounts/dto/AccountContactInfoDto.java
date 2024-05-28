package com.eazybytes.accounts.dto;
import java.util.*;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;
@ConfigurationProperties(prefix="accounts")
@Getter
@Setter
public class AccountContactInfoDto{
	private String message;
	private Map<String, String> contactDetails;
}
