from helium.api import *
import time

start_chrome("http://up810928.myvm.port.ac.uk/")

click(S("#recipe4"))

time.sleep(2)

if Text("Three Pepper Pizza").exists():
    print("Test Passed")
else:
    print("Test Failed")

kill_browser()