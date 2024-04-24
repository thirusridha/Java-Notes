package com.example.accounts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImple")
@OpenAPIDefinition(info = @Info(title = "Accounts Microservices REST API Documentation", description = "EazyBank Accounts microservices REST API Documentation", version = "v1", contact = @Contact(name = "Sridhar", email = "sri@gmail.com"), license = @License(name = "Apache 3.0", url = "")), externalDocs = @ExternalDocumentation(description = "EazyBank Accounts microservices REST API Documentation", url = "")

)
public class AccountsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountsApplication.class, args);
	}

}
