drop database if exists recipebook;

create database recipebook;

create table recipebook.Recipes(
  recipe_id int auto_increment,
  recipe_name varchar(100),
  recipe_description text,
  recipe_img_name varchar(100),
  recipe_prep_time int,
  recipe_cook_time int,
  recipe_feeds int,
  recipe_is_vegetarian bit,

  constraint primary key(recipe_id)
);

insert into recipebook.Recipes values (null, 'Fish Cakes', 'A fish cakes recipe from england.', 'fishcakes1.png', 30, 20, 4, 0);
insert into recipebook.Recipes values (null, 'Crispy Fish Cakes', 'Another fish cakes recipe from england. These ones are well cooked.', 'fishcakes2.png', 30, 120, 2, 0);
insert into recipebook.Recipes values (null, 'Cake', 'A cake recipe from france.', 'fishcakes3.png', 60, 20, 1, 0);
insert into recipebook.Recipes values (null, 'Vegeterian Pizza', 'Delicious italian vegerarian pizza.', 'cardcover001.png', 40, 15, 2, 1);
insert into recipebook.Recipes values (null, 'Chocolate cake', 'Chocolate cake topped with berries', 'cardcover002.png', 40, 15, 2, 1);

create table recipebook.RecipeMethod(
  method_id int auto_increment,
  recipe_id int,
  method_instr varchar(1000),

  constraint primary key(method_id),
  constraint foreign key(recipe_id) references Recipes(recipe_id)
);

insert into recipebook.RecipeMethod values (null, 1, 'To prepare the english fish cakes follow the following prepararion instructions...');
insert into recipebook.RecipeMethod values (null, 1, 'Once you have the ingredients prepared let get cooking the fish cakes');
insert into recipebook.RecipeMethod values (null, 2, 'To prepare crispy fish cakes follow the following prepararion instructions...');
insert into recipebook.RecipeMethod values (null, 2, 'Once you have the ingredients prepared let get cooking the crispy fish cakes');
insert into recipebook.RecipeMethod values (null, 3, 'To prepare a cakes follow the following prepararion instructions...');
insert into recipebook.RecipeMethod values (null, 3, 'Once you have the ingredients prepared let get cooking the cake');
insert into recipebook.RecipeMethod values (null, 4, 'To prepare a vegerarian pizza you will need to pre heat the oven...');
insert into recipebook.RecipeMethod values (null, 4, 'Once you have the ingredients ready, add them to the pizza and leave in the oven for 10 minutes...');
insert into recipebook.RecipeMethod values (null, 5, 'To prepare the chocolate cake do the following prepararion instructions...');
insert into recipebook.RecipeMethod values (null, 5, 'Once you have the ingredients prepared let get cooking the chocolate cake');

create table recipebook.Ingredient(
  ingredient_id int auto_increment,
  ingredient_name varchar(100),

  constraint primary key(ingredient_id)
);

insert into recipebook.Ingredient values (null, 'Chocolate');
insert into recipebook.Ingredient values (null, 'Tomato');
insert into recipebook.Ingredient values (null, 'Berries');
insert into recipebook.Ingredient values (null, 'Oil');
insert into recipebook.Ingredient values (null, 'Eggs');
insert into recipebook.Ingredient values (null, 'Flour');
insert into recipebook.Ingredient values (null, 'Bell peppers');
insert into recipebook.Ingredient values (null, 'Whipped cream');
insert into recipebook.Ingredient values (null, 'Breadcrumbs');
insert into recipebook.Ingredient values (null, 'Tomato sauce');

create table recipebook.RecipeIngredients(
  recipe_id int,
  ingredient_id int,
  recipeIngredients_quantity int,

  constraint primary key(recipe_id, ingredient_id),
  constraint foreign key(recipe_id) references Recipes(recipe_id),
  constraint foreign key(ingredient_id) references Ingredient(ingredient_id)
);

insert into recipebook.RecipeIngredients values (1, 9, 200);
insert into recipebook.RecipeIngredients values (1, 5, 2);
insert into recipebook.RecipeIngredients values (1, 4, 25);
insert into recipebook.RecipeIngredients values (2, 9, 300);
insert into recipebook.RecipeIngredients values (2, 5, 3);
insert into recipebook.RecipeIngredients values (2, 4, 50);
insert into recipebook.RecipeIngredients values (4, 10, 150);
insert into recipebook.RecipeIngredients values (4, 7, 2);
insert into recipebook.RecipeIngredients values (4, 6, 400);
insert into recipebook.RecipeIngredients values (4, 5, 2);
insert into recipebook.RecipeIngredients values (5, 1, 100);
insert into recipebook.RecipeIngredients values (5, 3, 10);
insert into recipebook.RecipeIngredients values (5, 4, 25);
insert into recipebook.RecipeIngredients values (5, 5, 2);
insert into recipebook.RecipeIngredients values (5, 6, 500);
insert into recipebook.RecipeIngredients values (5, 8, 100);
