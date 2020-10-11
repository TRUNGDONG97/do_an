CREATE DATABASE ManagerTimed;
USE ManagerTimed;
CREATE TABLE admin (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
email INT NOT NULL,
name VARCHAR(255),
is_active TINYINT,
token VARCHAR(255),
PRIMARY KEY (id)
);
CREATE TABLE mac_address(
id INT NOT NULL AUTO_INCREMENT,
address_mac VARCHAR(255),
PRIMARY KEY (id)
);
CREATE TABLE check_in(
id INT NOT NULL AUTO_INCREMENT,
id_employee INT,
time_check_in TIME,
date_check_in DATE,
is_active TINYINT,
PRIMARY KEY (id)
);
CREATE TABLE check_out(
id INT NOT NULL AUTO_INCREMENT,
id_employee INT,
id_check_in INT,
time_check_out TIME,
date_check_out DATE,
is_active TINYINT,
PRIMARY KEY (id)
);
CREATE TABLE notification (
id INT NOT NULL AUTO_INCREMENT,
content VARCHAR(255),
id_employee INT,
type TINYINT,
create_date DATETIME,
PRIMARY KEY (id)
);
CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(50),
phone CHAR(10),
birthday DATETIME,
password VARCHAR(50),
address VARCHAR(255),
email VARCHAR(100),
gener TINYINT,
url_avatar VARCHAR(255),
token VARCHAR(255),
is_active TINYINT,
PRIMARY KEY (id)
)

