from helium.api import *
import time

#Test to check that the keyword search responds with the correct recipe.

url = input("Enter site(VM) URL/IP: ")
start_chrome(url)

write("Three Pepper Pizza", S("#recipe-search-query"))
click(S("#recipe-search"))

time.sleep(2)

results = find_all(S(".card-wrapper"))

if len(results) == 1 and Text("Three Pepper Pizza").exists():
    print("Test Passed")
else:
    print("Test Failed")

kill_browser()
