
-- * * * B U I L D I N G  D A T A B A S E * * *

-- create database called bamazon
-- create table in database called products
-- products should have the following
	-- item_id (unique for each product) - int auto increment
	-- product_name (name of product (duh)) - varchar
	-- department_name - varchar
	-- price - decimal
	-- stock_quantity (how many of each is available in store) - int
-- populate database with 10 different products

drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products (
	item_id int not null auto_increment,
	product_name varchar(50) not null,
	department_name varchar(50) not null,
	price decimal(10,2) not null,
	stock_quantity int not null,
	primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
	values 
	("bamboo toothbrush", "health and beauty", 2.00, 500), 
	("hammock", "outdoor gear", 40.00, 200), 
	("winter hat", "clothing", 25.00, 300), 
	("bench", "furniture", 430.00, 50), 
	("dog food", "pets", 15.00, 200), 
	("vitamins", "health and beauty", 8.00, 400), 
	("striped socks", "clothing", 3.00, 500), 
	("camping tent", "outdoor gear", 75.00, 200), 
	("warm blanket", "home", 30.00, 300), 
	("hiking boots", "clothing", 50.00, 300);