import requests
from html.parser import HTMLParser


class MyHTMLParser(HTMLParser):
  def __init__(self):
    super().__init__()
    self.phone_number = None
  def handle_starttag(self, tag, attrs):
    if tag == 'a':
      for atr in attrs:
        attribute, value = atr
        if attribute == "class" and "statistics-click" in value and "number" in value:
          for atr in attrs:
            attribute, value = atr
            if attribute == "href" and value.startswith("tel:"):
              self.phone_number = value[4:]



def scrape_phone(url):

  html = requests.get(url).text
  if not html:
    return RuntimeError
  parser = MyHTMLParser()
  parser.feed(html)
  phone_number = parser.phone_number
  return phone_number