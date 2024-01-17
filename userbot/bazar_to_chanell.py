from datetime import datetime
from bazar_scrape import scrape_phone

def bazar_to_chanell(app,client,message,target):
  target_chat = target["target"]
  send_to_chat = target["send_to"]

  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == target_chat:
    chanell_link = target["chanell_link"] if "chanell_link" in target else None
    chat_link = target["chat_link"] if "chat_link" in target else None

    signature = f"\n"
    if chanell_link:
      signature += f"\n<b><a href='{chanell_link}'>☑️НАШ КАНАЛ</a></b>👈"
    if chat_link:
      signature += f"\n<b><a href='{chat_link}'>👉НАШ ЧАТ☑️</a></b>"



    if message.text:
      if "http" not in message.text and "bazar" not in message.text.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message)
          text = message.text
          website_phone = check_phone(message)
          if website_phone:
            text = text + f"\nКонтакты:\n📲 +{website_phone}"
          text = text + signature
          client.send_message(send_to_chat,text)
        except Exception as e:
          print(e)
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
    elif message.caption and message.photo and message.photo.file_id:
      if "http" not in message.caption and "bazar" not in message.caption.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message)
          text = message.text
          website_phone = check_phone(message)
          if website_phone:
            text = text + f"\nКонтакты:\n📲 +{website_phone}"
          text = text + signature
          app.send_photo(send_to_chat,message.photo.file_id,text)
        except Exception as e:
          print(e)
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
    elif message.caption:
      if "http" not in message.caption and "bazar" not in message.caption.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message)
          text = message.text
          website_phone = check_phone(message)
          if website_phone:
            text = text + f"\nКонтакты:\n📲 +{website_phone}"
          text = text + signature
          app.send_message(send_to_chat,text)
        except Exception as e:
          print(e)
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))




def check_phone(message):
  try:
    if message.reply_markup and message.reply_markup.inline_keyboard:
      first_button = message.reply_markup.inline_keyboard[0][0]
      if first_button:
        url = first_button.url
        website_phone = scrape_phone(url)
        if website_phone:
          return website_phone
        else:
          return None
      else:
        return None
    else:
      return None
  except Exception as e:
    print(e)
    return None