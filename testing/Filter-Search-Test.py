from helium.api import *
import time

#Test designed to check that adding a filter is properly validated and that searching using a valid filter responds with the correct recipes.

def getAmountOfFilters():
    return len(find_all(S("#filter-option")))

url = input("Enter site(VM) URL/IP: ")
start_chrome(url)

#No Ingredient or Quantity
click("New Filter")
click("Add")
if getAmountOfFilters() > 0:
    print("Test Failed: Filter was added despite no information entered.")
else:
    print("Test Passed")

#Ingredient, No Quantity
refresh()
click("New Filter")
write("Eggs", S("#filter-name"))
click("Add")
if getAmountOfFilters() > 0:
    print("Test Failed: Filter was added despite no quantity given.")
else:
    print("Test Passed")

#No Ingredient, Quantity
refresh()
click("New Filter")
write("3", S("#filter-quantity"))
click("Add")
if getAmountOfFilters() > 0:
    print("Test Failed: Filter was added despite no ingredient given.")
else:
    print("Test Passed")

#Ingredient, Negative Quantity -5
refresh()
click("New Filter")
write("Eggs", S("#filter-name"))
write("-5", S("#filter-quantity"))
click("Add")
if getAmountOfFilters() > 0:
    print("Test Failed: Filter was added despite quantity being negative (-5)")
else:
    print("Test Passed")

#Ingredient, Negative Quantity -1
refresh()
click("New Filter")
write("Eggs", S("#filter-name"))
write("-1", S("#filter-quantity"))
click("Add")
if getAmountOfFilters() > 0:
    print("Test Failed: Filter was added despite quantity being negative (-1)")
else:
    print("Test Passed")

#Ingredient, Quantity 0
refresh()
click("New Filter")
write("Eggs", S("#filter-name"))
write("0", S("#filter-quantity"))
click("Add")
if getAmountOfFilters() > 0:
    print("Test Failed: Filter was added despite quantity being 0")
else:
    print("Test Passed")

#Ingredient, Quantity lower bound (1)
refresh()
click("New Filter")
write("Eggs", S("#filter-name"))
write("1", S("#filter-quantity"))
click("Add")
if getAmountOfFilters() != 1:
    print("Test Failed: Filter was not added with valid quantity, 1.")
else:
    print("Test Passed")

#Ingredient, Quantity (5)
refresh()
click("New Filter")
write("Eggs", S("#filter-name"))
write("5", S("#filter-quantity"))
lengthBefore = getAmountOfFilters()
click("Add")
if getAmountOfFilters() != lengthBefore + 1:
    print("Test Failed: Filter was not added with valid quantity, 5.")
else:
    print("Test Passed")

click(S("#recipe-search"))

time.sleep(2)

if len(find_all(S(".card-wrapper"))) != 3:
    print("Test Failed: Filter did not provide the correct result.")
else:
    print("Test Passed")

kill_browser()
