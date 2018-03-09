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
insert into recipebook.Recipes values (null, 'Three Pepper Pizza Pizza', 'Delicious and healthy pizza.', 'cardcover001.png', 40, 15, 3, 1);
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
insert into recipebook.RecipeMethod values (null, 4, 'Preheat oven to 230°C');
insert into recipebook.RecipeMethod values (null, 4, 'Dice peppers, and chopp the onion');
insert into recipebook.RecipeMethod values (null, 4, 'Combine seasoning, tomato paste, and water in a small bowl; stir well.');
insert into recipebook.RecipeMethod values (null, 4, 'Spread the ingredients over pizza crust. Top evenly with cheese. Sprinkle bell pepper and onion evenly over cheese.');
insert into recipebook.RecipeMethod values (null, 4, 'Bake at 230°C for 10 to 12 minutes or until cheese melts. Cut into 6 wedges, and serve.');
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
insert into recipebook.Ingredient values (null, 'Italian seasoning');
insert into recipebook.Ingredient values (null, 'Tomato paste');
insert into recipebook.Ingredient values (null, 'Water');
insert into recipebook.Ingredient values (null, 'Prebaked refrigerated pizza crust');
insert into recipebook.Ingredient values (null, 'Mozzarella cheese');
insert into recipebook.Ingredient values (null, 'Onion');


create table recipebook.RecipeIngredients(
  recipe_id int,
  ingredient_id int,
  recipeIngredients_quantity varchar(500),

  constraint primary key(recipe_id, ingredient_id),
  constraint foreign key(recipe_id) references Recipes(recipe_id),
  constraint foreign key(ingredient_id) references Ingredient(ingredient_id)
);

insert into recipebook.RecipeIngredients values (1, 9, '200');
insert into recipebook.RecipeIngredients values (1, 5, '2');
insert into recipebook.RecipeIngredients values (1, 4, '25');
insert into recipebook.RecipeIngredients values (2, 9, '300');
insert into recipebook.RecipeIngredients values (2, 5, '3');
insert into recipebook.RecipeIngredients values (2, 4, '50');
insert into recipebook.RecipeIngredients values (4, 11, '1/4 teaspoon');
insert into recipebook.RecipeIngredients values (4, 12, '1/3 cup');
insert into recipebook.RecipeIngredients values (4, 13, '1/4 cup');
insert into recipebook.RecipeIngredients values (4, 14, '1 (12-inch)');
insert into recipebook.RecipeIngredients values (4, 15, '1 cup (100 grams) shredded');
insert into recipebook.RecipeIngredients values (4, 7, '1 1/2 cups, 3 small');
insert into recipebook.RecipeIngredients values (4, 16, '1/2');
insert into recipebook.RecipeIngredients values (5, 1, '100');
insert into recipebook.RecipeIngredients values (5, 3, '10');
insert into recipebook.RecipeIngredients values (5, 4, '25');
insert into recipebook.RecipeIngredients values (5, 5, '2');
insert into recipebook.RecipeIngredients values (5, 6, '500');
insert into recipebook.RecipeIngredients values (5, 8, '100');
