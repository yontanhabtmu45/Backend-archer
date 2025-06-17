-- vehicles tables
CREATE TABLE IF NOT EXISTS `vehicle_identifier` (
  `vehicle_iden_id` INT(11) NOT NULL AUTO_INCREMENT,
  `vehicle_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `vehicle_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`vehicle_iden_id`),
  UNIQUE (`vehicle_hash`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `vehicle_info` (
  `vehicle_id` INT(11) NOT NULL AUTO_INCREMENT,
  `vehicle_iden_id` INT(11) NOT NULL, 
  `vehicle_year` INT(11) NOT NULL,
  `vehicle_make` VARCHAR(255) NOT NULL,
  `vehicle_model` VARCHAR(255) NOT NULL,
  `vehicle_type` VARCHAR(255) NOT NULL,
  `vehicle_mileage` INT(11) NOT NULL, 
  `vehicle_tag` VARCHAR(255) NOT NULL,
  `vehicle_serial` VARCHAR(255) NOT NULL,
  `vehicle_color` VARCHAR(255) NOT NULL,
  `vehicle_total_price` INT(11) NOT NULL,
  `vehicle_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`vehicle_id`),
  FOREIGN KEY (`vehicle_iden_id`) REFERENCES `vehicle_identifier`(`vehicle_iden_id`)
) ENGINE=InnoDB;

-- steel tables
CREATE TABLE IF NOT EXISTS `steel_identifier` (
  `steel_iden_id` INT(11) NOT NULL AUTO_INCREMENT,
  `steel_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `steel_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`steel_iden_id`),
  UNIQUE (`steel_hash`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `steel_info` (
  `steel_id` INT(11) NOT NULL AUTO_INCREMENT,
  `steel_iden_id` INT(11) NOT NULL, 
  `steel_type` VARCHAR(255) NOT NULL,
  `steel_weight` INT(11) NOT NULL,
  `steel_price_per_ton` DECIMAL(10,2) NOT NULL,
  `steel_total_price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`steel_id`),
  FOREIGN KEY (`steel_iden_id`) REFERENCES `steel_identifier`(`steel_iden_id`)
) ENGINE=InnoDB;

-- Company tables 
CREATE TABLE IF NOT EXISTS `company_roles` (
  `company_role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `company_role_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`company_role_id`),
  UNIQUE (`company_role_name`)
) ENGINE=InnoDB;

-- admin tables 
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` INT(11) NOT NULL AUTO_INCREMENT,
  `admin_email` VARCHAR(255) NOT NULL,
  `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`), 
  UNIQUE (`admin_email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `admin_info` (
  `admin_info_id` INT(11) NOT NULL AUTO_INCREMENT,
  `admin_id` INT(11) NOT NULL,
  `admin_first_name` VARCHAR(255) NOT NULL,
  `admin_last_name` VARCHAR(255) NOT NULL,
  `admin_phone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`admin_info_id`),
  FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `admin_pass` (
  `admin_pass_id` INT(11) NOT NULL AUTO_INCREMENT,
  `admin_id` INT(11) NOT NULL,
  `admin_password_hashed` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`admin_pass_id`),
  FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `admin_role` (
  `admin_role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `admin_id` INT(11) NOT NULL,
  `company_role_id` INT(11) NOT NULL,
  PRIMARY KEY (`admin_role_id`),
  FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`),
  FOREIGN KEY (`company_role_id`) REFERENCES `company_roles`(`company_role_id`)
) ENGINE=InnoDB;

-- Add the roles to the database 
INSERT INTO `company_roles` (`company_role_name`)
VALUES ('Employee'), ('Manager'), ('Admin');

-- This is the admin account 
INSERT INTO `admin` (`admin_email`)
VALUES ('admin@admin.com');

INSERT INTO `admin_info` (`admin_id`, `admin_first_name`, `admin_last_name`, `admin_phone`)
VALUES (1, 'Admin', 'Admin', '555-555-5555'); 

-- Password is "123456"
INSERT INTO `admin_pass` (`admin_id`, `admin_password_hashed`)
VALUES (1, '$2b$10$B6yvl4hECXploM.fCDbXz.brkhmgqNlawh9ZwbfkFX.F3xrs.15Xi');  

INSERT INTO `admin_role` (`admin_id`, `company_role_id`)
VALUES (1, 3);
