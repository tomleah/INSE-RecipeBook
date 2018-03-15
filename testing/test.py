'''
Script for tersting of the website, change the url variable to the url you are
hosting the website at.
'''

from helium.api import *

url = "http://35.205.150.213/"

# Load webpage
start_chrome(url)
scroll_down(300)
scroll_up(300)

# Click on a recipe
click("Three pepper pizza")
scroll_down(300)
scroll_up(300)

# Make a search by name
click("Home")
write("Fish", into = "Search")
click(Button("recipe-search"))
click("Crispy Fish Cakes")

# Make incomplete searchs by ingredients
click("Home")
click("New Filter")
write("Eggs", into = "Ingredient Name")
click("Add")

write("", into = "Ingredient Name")
write("4", into = "Quantity")
click("Add")
click(Button("recipe-search"))

# Make a search by ingredients
write("OIl", into = "Ingredient Name")
write("1000", into "Quantity")
select("unit-list", "ml")
click("Add")
click(Button("recipe-search"))

# Search for a recipe after applying ingredients filters
write("Chocolate", into = "Search")
click(Button("recipe-search"))


kill_browser()
