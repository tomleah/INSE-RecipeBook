from helium.api import *
import time

#Test to check that recipes are shown on the page.

url = input("Enter site(VM) URL/IP: ")
start_chrome(url)

click(S("#recipe4"))

time.sleep(2)

if Text("Three Pepper Pizza").exists():
    print("Test Passed")
else:
    print("Test Failed")

kill_browser()
