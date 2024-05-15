package com.eazybytes.accounts.dto;
import java.util.*;

import org.springframework.boot.context.properties.ConfigurationProperties;
@ConfigurationProperties(prefix="accounts")
public record AccountContactInfoDto(String message,Map<String,String> contactDetails) {
	
}
