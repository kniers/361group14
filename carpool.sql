#####################
# CS361 Carpool Database
#####################


DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `route`;
DROP TABLE IF EXISTS `ride`;
DROP TABLE IF EXISTS `payment`;


#######create########

CREATE TABLE users (
	id int AUTO_INCREMENT,
	username varchar(255) NOT NULL UNIQUE,
	password varchar(64) NOT NULL,
	rating int,
	GPS boolean, 
	driver boolean,
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE route (
	id int AUTO_INCREMENT,
	username varchar(255),
	name varchar(255) UNIQUE,
	startLocation varchar(255),
	endLocation varchar(255),
	startTime time,
	endTime time,
	distance float,
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE ride (
	id int AUTO_INCREMENT,
	routeName varchar(255),
	username varchar(255),
	driverName varchar(255),
	mileage int,
	rating int,
	price float,
	date date,
	PRIMARY KEY (id),
	FOREIGN KEY (routeName) REFERENCES route (name),
	FOREIGN KEY (username) REFERENCES users (username),
	FOREIGN KEY (driverName) REFERENCES users (username)
) ENGINE=InnoDB;

CREATE TABLE payment (
	id int AUTO_INCREMENT,
	cardNumber bigint NOT NULL,
	uid int,
	cvv int NOT NULL,
	expMonth int NOT NULL,
	expYear int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (uid) REFERENCES users (id)
) ENGINE=InnoDB;

