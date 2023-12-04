from datetime import datetime


def bazar_to_chanell(app,client,message,target):
  target_chat = target["target"]
  send_to_chat = target["send_to"]

  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == target_chat:
    chanell_link = target["chanell_link"] if "chanell_link" in target else None
    chat_link = target["chat_link"] if "chat_link" in target else None

    signature = f"\n"
    if chanell_link:
      signature += f"\n<b><a href='{chanell_link}'>☑️НАШ КАНАЛ</a></b>👈"
      print('1')
    if chat_link:
      signature += f"\n<b><a href='{chat_link}'>👉НАШ ЧАТ☑️</a></b>"
      print('2')
    print(signature)
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