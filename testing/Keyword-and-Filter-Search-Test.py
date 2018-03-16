from helium.api import *
import time

#Test to see if using a valid filter and keywords will respond with the correct recipe.

url = input("Enter site(VM) URL/IP: ")
start_chrome(url)

click("New Filter")
write("Eggs", S("#filter-name"))
write("5", S("#filter-quantity"))
click("Add")

write("Chocolate", S("#recipe-search-query"))
click(S("#recipe-search"))

time.sleep(2)

if len(find_all(S(".card-wrapper"))) == 1:
    print("Test Passed")
else:
    print("Test Failed: An unexpected amount of recipes were produced")

kill_browser()
