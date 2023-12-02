from datetime import datetime


def bazar_to_chanell(app,client,message,target):
  target_chat = target["target"]
  send_to_chat = target["send_to"]
  chanell_link = target["chanell_link"]
  chat_link = target["chat_link"]
  signature = f"\n\n<b><a href='{chanell_link}'>☑️НАШ КАНАЛ</a></b>👈\n<b><a href='{chat_link}'>👉НАШ ЧАТ☑️</a></b>"
  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == target_chat:
    if message.text:
      if "http" not in message.text and "bazar" not in message.text.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message.text)
          text = message.text + signature
          client.send_message(send_to_chat,text)
        except TypeError or KeyError:
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
          print(message)
    elif message.caption and message.photo and message.photo.file_id:
      if "http" not in message.caption and "bazar" not in message.caption.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message.caption)
          text = message.caption + signature
          app.send_photo(send_to_chat,message.photo.file_id,text)
        except TypeError or KeyError:
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
          print(message)
    elif message.caption:
      if "http" not in message.caption and "bazar" not in message.caption.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message.caption)
          text = message.caption + signature
          app.send_message(send_to_chat,text)
        except TypeError or KeyError:
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
          print(message)