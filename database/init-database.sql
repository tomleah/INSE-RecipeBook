drop database if exists recipebook;

create database recipebook;
use recipebook;

create table Recipes(
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

insert into Recipes values (null, 'Fish Cakes', 'A fish cakes recipe from england.', 'fishcakes.png', 30, 20, 4, 0);
insert into Recipes values (null, 'Crispy Fish Cakes', 'Another fish cakes recipe from england. These ones are well cooked.', 'fishcakes.png', 30, 120, 2, 0);
insert into Recipes values (null, 'Cake', 'A cake recipe from france.', 'cakecardcover.png', 60, 20, 1, 0);
insert into Recipes values (null, 'Three Pepper Pizza', 'Delicious and healthy pizza.', 'pizzacardcover.png', 40, 15, 3, 1);
insert into Recipes values (null, 'Chocolate cake', 'Chocolate cake topped with berries', 'cakecardcover.png', 40, 15, 2, 1);

create table RecipeMethod(
  method_id int auto_increment,
  recipe_id int,
  method_instr text,

  constraint primary key(method_id),
  constraint foreign key(recipe_id) references Recipes(recipe_id)
);

insert into RecipeMethod values (null, 1, 'To prepare the english fish cakes follow the following prepararion instructions...');
insert into RecipeMethod values (null, 1, 'Once you have the ingredients prepared let get cooking the fish cakes');
insert into RecipeMethod values (null, 2, 'To prepare crispy fish cakes follow the following prepararion instructions...');
insert into RecipeMethod values (null, 2, 'Once you have the ingredients prepared let get cooking the crispy fish cakes');
insert into RecipeMethod values (null, 3, 'To prepare a cakes follow the following prepararion instructions...');
insert into RecipeMethod values (null, 3, 'Once you have the ingredients prepared let get cooking the cake');
insert into RecipeMethod values (null, 4, 'Preheat oven to 230°C');
insert into RecipeMethod values (null, 4, 'Dice peppers, and chopp the onion');
insert into RecipeMethod values (null, 4, 'Combine seasoning, tomato paste, and water in a small bowl; stir well.');
insert into RecipeMethod values (null, 4, 'Spread the ingredients over pizza crust. Top evenly with cheese. Sprinkle bell pepper and onion evenly over cheese.');
insert into RecipeMethod values (null, 4, 'Bake at 230°C for 10 to 12 minutes or until cheese melts. Cut into 6 wedges, and serve.');
insert into RecipeMethod values (null, 5, 'To prepare the chocolate cake do the following prepararion instructions...');
insert into RecipeMethod values (null, 5, 'Once you have the ingredients prepared let get cooking the chocolate cake');

create table Ingredient(
  ingredient_id int auto_increment,
  ingredient_name varchar(100),
  ingredient_unit varchar(100) null,

  constraint primary key(ingredient_id)
);

insert into Ingredient values (null, 'Chocolate', 'g');
insert into Ingredient values (null, 'Tomato', null);
insert into Ingredient values (null, 'Berries', 'g');
insert into Ingredient values (null, 'Oil', 'ml');
insert into Ingredient values (null, 'Eggs', null);
insert into Ingredient values (null, 'Flour', 'g');
insert into Ingredient values (null, 'Bell peppers', null);
insert into Ingredient values (null, 'Whipped cream', null);
insert into Ingredient values (null, 'Breadcrumbs', 'g');
insert into Ingredient values (null, 'Tomato sauce', 'ml');
insert into Ingredient values (null, 'Italian seasoning', 'g');
insert into Ingredient values (null, 'Tomato paste', null);
insert into Ingredient values (null, 'Water', 'ml');
insert into Ingredient values (null, 'Prebaked refrigerated pizza crust', null);
insert into Ingredient values (null, 'Mozzarella cheese', 'g');
insert into Ingredient values (null, 'Onion', null);


create table RecipeIngredients(
  recipe_id int,
  ingredient_id int,
  recipeIngredients_quantity varchar(500) null,

  constraint primary key(recipe_id, ingredient_id),
  constraint foreign key(recipe_id) references Recipes(recipe_id),
  constraint foreign key(ingredient_id) references Ingredient(ingredient_id)
);

insert into RecipeIngredients values (1, 9, '200');
insert into RecipeIngredients values (1, 5, '2');
insert into RecipeIngredients values (1, 4, '25');
insert into RecipeIngredients values (2, 9, '300');
insert into RecipeIngredients values (2, 5, '3');
insert into RecipeIngredients values (2, 4, '50');
insert into RecipeIngredients values (4, 11, '10');
insert into RecipeIngredients values (4, 12, null);
insert into RecipeIngredients values (4, 14, '1');
insert into RecipeIngredients values (4, 15, '50');
insert into RecipeIngredients values (4, 7, '3');
insert into RecipeIngredients values (4, 16, '1/2');
insert into RecipeIngredients values (5, 1, '100');
insert into RecipeIngredients values (5, 3, '10');
insert into RecipeIngredients values (5, 4, '25');
insert into RecipeIngredients values (5, 5, '2');
insert into RecipeIngredients values (5, 6, '500');
insert into RecipeIngredients values (5, 8, null);
