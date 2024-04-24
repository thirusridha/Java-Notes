package com.example.accounts.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
@Component("auditAwareImple")
public class AuditAwareImple implements AuditorAware<String>{
	public Optional<String> getCurrentAuditor(){
		return Optional.of("ACCOUNTS_MS");
	}
}
