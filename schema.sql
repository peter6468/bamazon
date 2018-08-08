drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
  item_id integer auto_increment not null,
  product_name VARCHAR(45)  NOT NULL,
  department_name 	VARCHAR(65),
  price DECIMAL(10,4) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("LOL SUPRISE DOLLS", "toys", 12.88, 58),
	("UNO", "toys", 4.99, 91),
	("Playdoh", "toys", 39.99, 97),	
	("Echo Dot", "electronics", 49.99, 995),
	("Kindle", "electronics", 119.99, 5994),
	("Firestick", "electronics", 39.99, 5999),	
	("Call of Duty", "videogames", 59.99, 1989),
	("Minecraft", "videogames", 39.99, 1963),
	("Mariokart", "videogames", 49.99, 799),	
	("Tetris", "videogames", 29.99, 0);