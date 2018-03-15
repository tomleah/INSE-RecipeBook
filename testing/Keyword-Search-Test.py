from helium.api import *
import time

start_chrome("http://up810928.myvm.port.ac.uk/")

write("Three Pepper Pizza", S("#recipe-search-query"))
click(S("#recipe-search"))

time.sleep(2)

results = find_all(S(".card-wrapper"))

if len(results) == 1 and Text("Three Pepper Pizza").exists():
    print("Test Passed")
else:
    print("Test Failed")

kill_browser()