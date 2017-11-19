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
	uid int,
	startLocation geometry,
	endLocation geometry,
	startTime time,
	endTime time,
	mon boolean,
	tue boolean,
	wed boolean,
	thur boolean,
	fri boolean,
	sat boolean,
	sun boolean,
	distance float,
	PRIMARY KEY (id),
	FOREIGN KEY (uid) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE ride (
	id int AUTO_INCREMENT,
	rid int,
	pid int,
	did int,
	distance float,
	mileage int,
	price float,
	date date,
	PRIMARY KEY (id),
	FOREIGN KEY (rid) REFERENCES route (id),
	FOREIGN KEY (pid) REFERENCES users (id),
	FOREIGN KEY (did) REFERENCES users (id)
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

