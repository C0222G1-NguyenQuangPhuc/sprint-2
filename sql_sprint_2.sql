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

INSERT INTO `app_user` (`password`, `user_name`) VALUES ('$2a$12$mvDPX67K.dOCRr6nESBYr.08FnNlWVToJp80m2TcFRzg7WWzPvp8S', 'admin');
INSERT INTO `app_user` (`password`, `user_name`) VALUES ('$2a$12$mvDPX67K.dOCRr6nESBYr.08FnNlWVToJp80m2TcFRzg7WWzPvp8S', 'employee');
INSERT INTO `app_user` (`password`, `user_name`) VALUES ('$2a$12$mvDPX67K.dOCRr6nESBYr.08FnNlWVToJp80m2TcFRzg7WWzPvp8S', 'user');

INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('1', '1');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('2', '1');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('3', '1');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('2', '2');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('3', '2');
INSERT INTO `user_role` (`role_id`, `user_id`) VALUES ('3', '3');

INSERT INTO category (delete_status, discount_percent, image, name) VALUES (0, 10, 'assets/img/cat-1.jpg', 'Điện thoại');
INSERT INTO category (delete_status, discount_percent, image, name) VALUES (0, 10, 'assets/img/cat-2.jpg', 'Tivi');
INSERT INTO category (delete_status, discount_percent, image, name) VALUES (0, 10, 'assets/img/cat-3.jpg', 'Máy tính');
INSERT INTO category (delete_status, discount_percent, image, name) VALUES (0, 10, 'assets/img/cat-4.jpg', 'Điều hòa');

INSERT INTO customer (address, delete_status, email, image, name, phone_number, status, user_id) VALUES ('Đà Nẵng', 0, 'phucprokoten@gmail.com', 'Không', 'Nguyễn Quang Phúc', '0773230767', 0, 1);
INSERT INTO customer (address, delete_status, email, image, name, phone_number, status, user_id) VALUES ('Quảng Nam', 0, 'dtrung2k3@gmail.com', 'Không', 'Nguyễn Duy Trung', '0906333777', 0, 2);
INSERT INTO customer (address, delete_status, email, image, name, phone_number, status, user_id) VALUES ('Kon Tum', 0, 'hdtuan2k@gmail.com', 'Không', 'Hồ Duy Tuấn', '0352456677', 0, 3);

INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-01 08:00:00', 'Apple', 'Apple Iphone 11 64G Black', 13490000, 10, '2019-09-01', '1 năm', 1, 'assets/img/phone-1.jpg');
INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-01 09:00:00', 'Oppo', 'OPPO CPH2349 - A16k', 3990000, 10, '2019-09-01', '1 năm', 1, 'assets/img/phone-2.jpg');
INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-02 09:00:00', 'Samsung', 'Samsung 65Q70A 65 inch', 44900000, 5, '2020-09-02', '2 năm', 2, 'assets/img/tv-1.jpg');
INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-02 10:00:00', 'Sony', 'Sony KD-55X75K 55 inch', 21400000, 5, '2020-09-02', '2 năm', 2, 'assets/img/tv-2.jpg');
INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-03 10:00:00', 'Lenovo', 'Lenovo V15 G2 ITL 82KB00QNVN', 12900000, 20, '2021-09-03', '3 năm', 3, 'assets/img/laptop-1.jpg');
INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-03 11:00:00', 'Dell', 'Dell Inspiron 3511 P112F001CBL', 18290000, 20, '2021-09-03', '3 năm', 3, 'assets/img/laptop-2.jpg');
INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-04 11:00:00', 'Daikin', 'Daikin 1 chiều Inverter 8.500BTU', 12090000, 15, '2019-09-04', '2 năm', 4, 'assets/img/air-1.jpg');
INSERT INTO product (delete_status, manufacture_time, manufacturer, name, price, quantity, release_time, warranty, category_id, image)
			VALUES (0, '2022-09-04 12:00:00', 'Aqua', 'Aqua 1 chiều Inverter 9.200BTU', 10190000, 15, '2019-09-04', '2 năm', 4, 'assets/img/air-2.jpg');

