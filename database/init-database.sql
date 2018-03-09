drop database if exists recipebook;

create database recipebook;

create table recipebook.Recipes (
  recipe_id int primary key auto_increment,
  recipe_name varchar(100),
  recipe_description text,
  recipe_img_name varchar(100),
  recipe_prep_time int,
  recipe_cook_time int,
  recipe_feeds int,
  recipe_is_vegetarian bit
);

insert into recipebook.Recipes values (null, 'Fish Cakes', 'A fish cakes recipe from england.', 'fishcakes1.png', 30, 20, 4, 0);
insert into recipebook.Recipes values (null, 'Crispy Fish Cakes', 'Another fish cakes recipe from england. These ones are well cooked.', 'fishcakes2.png', 30, 120, 2, 0);
insert into recipebook.Recipes values (null, 'Cake', 'A cake recipe from france.', 'fishcakes3.png', 60, 20, 1, 0);
  --------------------------------
insert into recipebook.Recipes values (null, 'Vegeterian Pizza', 'Delicious vegerarian pizza.', 'cardcover001.png', 40, 15, 2, 1);
insert into recipebook.Recipes values (null, 'Chocolate cake', 'Chocolate cake topped with berries', 'cardcover002.png', 40, 15, 2, 1);
