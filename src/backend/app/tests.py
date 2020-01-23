import rangdooncore.appservice.swatchservice as srv

#from rangdooncore.appservice import swatchservice as srv

with open("./kuler2.html", mode="r", encoding="utf-8") as file:
    html = file.read()

file = srv.extract_from_adobe_color(html)