CREATE DATABASE grupo16;

USE grupo16;


create table users(
user_id int NOT NULL AUTO_INCREMENT,         
user_name varchar(50) NOT NULL, 
user_email varchar(40) NOT NULL,
user_adress varchar(60) ,
user_pass varchar(40) NOT NULL,
user_image varchar(35) NOT NULL,
primary key (user_id)
);


create table orders(
order_id int NOT NULL,
order_date timestamp NOT NULL,
order_status boolean NOT NULL,
primary key (order_id)
);

CREATE TABLE categorys(
category_id int NOT NULL,
category_name varchar(60) NOT NULL,
primary key (category_id)
);


create table products(
product_id int NOT NULL auto_increment,
product_name varchar(50) NOT NULL,
product_price int NOT NULL,
product_description varchar(180) NOT NULL,
product_image_front varchar(60) NOT NULL,
product_image_back varchar(60) NOT NULL,
category_id int NOT NULL,
primary key (product_id),
foreign key (category_id) references categorys(category_id)
);

create table orders_products(
order_products_id int NOT NULL,
order_id int NOT NULL,
product_id int NOT NULL,
primary key (order_products_id),
foreign key (order_id) references orders(order_id),
foreign key (product_id) references products(product_id)
);



INSERT INTO categorys (category_id, category_name) VALUES (1, 'La-Liga'), (2, 'Premier-League'), (3, 'Bundesliga'), (4, 'Ligue-1'), (5, 'Primera-Division-Argentina'), (6, 'Primera-Division-Colombiana'), (7, 'Selecciones-Del-Mundo');

insert into products(product_id, product_name, product_price, product_description, product_image_front, product_image_back, category_id) values
(1,"Real Madrid", 20000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "real-madrid-frente.jpg", "real-madrid-back.jpg", 1),
(2,"Barcelona", 18000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "barca-frente.jpg", "barca-back.jpg", 1),
(3,"Atletico de Madrid", 20000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "atletico-frente.jpg", "atletico-back.jpg", 1),
(4,"Liverpool", 18000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "liverpool-frente.jpg", "liverpool-back.jpg", 2),
(5,"Manchester City", 20000, "Camiseta marca Puma, manga corta, tela antitranspirante sin numeración.", "city-frente.jpg", "city-back.jpg", 2),
(6,"Chelsea", 18000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "chelsea-frente.jpg", "chelsea-back.jpg", 2),
(7,"Bayern de Múnich", 18000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "bayern-frente.jpg", "bayern-back.jpg", 3),
(8,"Borussia dortmund", 20000, "Camiseta marca Puma, manga corta, tela antitranspirante sin numeración.", "borussia-frente.jpg", "borussia-back.jpg", 3),
(9,"Frankfurt", 18000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "frankfurt-frente.jpg", "frankfurt-back.jpg", 3),
(10,"PSG", 18000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "psg-frente.jpg", "psg-back.jpg", 4),
(11,"Monaco", 20000, "Camiseta marca kappa, manga corta, tela antitranspirante sin numeración.", "monaco-frente.jpg", "monaco-back.jpg", 4),
(12,"Marsella", 18000, "Camiseta marca Puma, manga corta, tela antitranspirante sin numeración.", "marsella-frente.jpg", "marsella-back.jpg", 4),
(13,"Boca Juniors", 18000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "boca-frente.jpg", "boca-back.jpg", 5),
(14,"River Plate", 20000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "river-frente.jpg", "river-back.jpg", 5),
(15,"Racing", 18000, "Camiseta marca Kappa, manga corta, tela antitranspirante sin numeración.", "racing-frente.jpg", "racing-back.jpg", 5),
(16,"Millonarios", 18000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "millonarios-frente.jpg", "millonarios-back.jpg", 6),
(17,"Junior", 20000, "Camiseta marca kappa, manga corta, tela antitranspirante sin numeración.", "junior-frente.jpg", "junior-back.jpg", 6),
(18,"Nacional", 18000, "Camiseta marca Puma, manga corta, tela antitranspirante sin numeración.", "nacional-frente.jpg", "nacional-back.jpg", 6),
(19,"Argentina", 18000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "argentina-frente.jpg", "argentina-back.jpg", 7),
(20,"Colombia", 20000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "colombia-frente.webp", "colombia-back.webp", 7),
(21,"Brasil", 18000, "Camiseta marca Nike, manga corta, tela antitranspirante sin numeración.", "brasil-frente.jpg", "brasilback.jpg", 7);



insert into users(user_id, user_name, user_email, user_adress, user_pass, user_image) VALUES
( 2, "Santiago2", "algo2@gmail.com", "Avenida # 222","word5678", "img_user_default.png"),
( 9, "Santiago", "algo@gmail.com", "Avenida # 111", "pass1234", "img_user_default.png");


