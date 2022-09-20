drop database if exists shop_online;
create database if not exists shop_online;
use shop_online;
CREATE TABLE `app_role` (
  `id` int primary key auto_increment,
  `delete_status` bit(1) DEFAULT b'0',
  `role_name` varchar(255) NOT NULL UNIQUE
);
CREATE TABLE `app_user` (
  `id` int primary key NOT NULL AUTO_INCREMENT,
  `creation_date` date DEFAULT NULL,
  `delete_status` bit(1) DEFAULT b'0',
  `password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL
);
CREATE TABLE `user_role` (
  `id` int primary key NOT NULL AUTO_INCREMENT,
  `delete_status` bit(1) DEFAULT b'0',
  `role_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`),
  FOREIGN KEY (`role_id`) REFERENCES `app_role` (`id`)
);
CREATE TABLE `category` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `name` varchar(255),
	PRIMARY KEY (`id`)
);
CREATE TABLE `customer` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `name` varchar(255),
    `phone_number` varchar(255),
    `address` text,
    `image` text,
    `status` bit(1) DEFAULT b'0',
    `email` varchar(255),
    `user_id` int unique,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`)
);
CREATE TABLE `promotion` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `name` varchar(255),
	PRIMARY KEY (`id`)
);
CREATE TABLE `product` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `name` varchar(255),
    `operating_system` varchar(255),
    `cpu` varchar(255),
    `ram` varchar(255),
    `camera` varchar(255),
    `screen_resolution` varchar(255),
    `release_time` date,
    `graphic_card` varchar(255),
    `price` double,
    `real_price` double,
    `description` text,
    `image` text,
    `category_id` int,
    `promotion_id` int,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
    FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`)
);
CREATE TABLE `coupon` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `name` varchar(255),
    `discount_percent` int,
    `product_id` int,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);
CREATE TABLE `bill` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `name` varchar(255),
	PRIMARY KEY (`id`)
);
CREATE TABLE `feedback` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `content` varchar(255),
    `feedback_date` date,
    `image` text,
    `rate` int,
    `bill_id` int,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`)
);
CREATE TABLE `order` (
	`id` int not null auto_increment,
    `delete_status` bit(1) DEFAULT b'0',
    `quantity` int,
    `customer_id` int,
    `product_id` int,
    `bill_id` int,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
    FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
    FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`)
);
INSERT INTO `app_role` (`role_name`) VALUES ('ADMIN');
INSERT INTO `app_role` (`role_name`) VALUES ('EMPLOYEE');
INSERT INTO `app_role` (`role_name`) VALUES ('USER');
INSERT INTO `app_user` (`password`, `user_name`) VALUES ('$2a$10$CqdLCRz4f8HGTqmChZQ9q.5brX6Ry.If8q8D9dYS1gOF1rnUSCmiq', 'admin');
INSERT INTO `app_user` (`password`, `user_name`) VALUES ('$2a$10$CqdLCRz4f8HGTqmChZQ9q.5brX6Ry.If8q8D9dYS1gOF1rnUSCmiq', 'employee');
INSERT INTO `app_user` (`password`, `user_name`) VALUES ('$2a$10$CqdLCRz4f8HGTqmChZQ9q.5brX6Ry.If8q8D9dYS1gOF1rnUSCmiq', 'user');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('1', '1');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('2', '1');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('3', '1');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('2', '2');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('3', '2');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('3', '3');