drop database if exists recipebook;

create database if not exists recipebook;

create table if not exists recipebook.Recipes (
  recipe_id int primary key auto_increment,
  recipe_name varchar(100),
  recipe_description text,
  recipe_img_name varchar(100),
  recipe_prep_time int,
  recipe_cook_time int,
  recipe_feeds int
);

insert ignore into recipebook.Recipes values (1, 'Fish Cakes', 'A fish cakes recipe from england.', 'fishcakes1.png', 30, 20, 4);
insert ignore into recipebook.Recipes values (2, 'Crispy Fish Cakes', 'Another fish cakes recipe from england. These ones are well cooked.', 'fishcakes2.png', 30, 120, 0);
insert ignore into recipebook.Recipes values (3, 'Cake', 'A cake recipe from france.', 'fishcakes3.png', 60, 20, 1);
