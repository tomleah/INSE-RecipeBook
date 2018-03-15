'''
Script for tersting of the website, change the url variable to the url you are
hosting the website at.
'''

from helium.api import *

url = "http://35.205.150.213/"

start_chrome(url)

scroll_down(300)
scroll_up(300)

click("Three pepper pizza")
scroll_down(300)
scroll_up(300)

click("Home")
write("Fish", into= "Search")
click(Button("recipe-search"))
click("Crispy Fish Cakes")

click("Home")
