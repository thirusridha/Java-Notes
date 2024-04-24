create table `customer`(
`customer_id` int auto_increment PRIMARY KEY,
`name` varchar(100) NOT NULL,
`email` varchar(100) NOT NULL,
`mobile_number` varchar(100) NOT NULL,
`created_at` varchar(100) NOT NULL,
`created_by` varchar(100) NOT NULL,
`updated_at` varchar(100) NOT NULL,
`updated_by` varchar(100) NOT NULL
);
create table `accounts`(
`customer_id` int NOT NULL	,
`account_number` int auto_increment primary key,
`account_type` varchar(100) NOT NULL,
`branch_address` varchar(200) NOT NULL,
`created_at` varchar(100) NOT NULL,
`created_by` varchar(100) NOT NULL,
`updated_at` varchar(100) NOT NULL,
`updated_by` varchar(100) NOT NULL
)