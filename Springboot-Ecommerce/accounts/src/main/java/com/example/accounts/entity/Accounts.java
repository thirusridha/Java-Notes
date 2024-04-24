package com.example.accounts.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Accounts extends BaseEntity {
	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
//	@GenericGenerator(name="native",strategy = "native")
	private Long accountNumber;
	private Long customerId;
	private String accountType;
	private String branchAddress;
}
