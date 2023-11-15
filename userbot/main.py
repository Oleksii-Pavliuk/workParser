from pyrogram import filters
from config import app,TARGET,TEST_CHAT,WORK_NEW_YORK
from datetime import datetime

print("Started!")
@app.on_message(filters.channel)
def HandleMessage (client,message):
  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == TEST_CHAT:
    if message.text:
      if "http" not in message.text and "bazar" not in message.text.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message.text)
          client.send_message(TEST_CHAT,message.text)
        except TypeError or KeyError:
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
          print(message)
    elif message.caption and message.photo and message.photo.file_id:
      if "http" not in message.caption and "bazar" not in message.caption.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message.caption)
          app.send_photo(TEST_CHAT,message.photo.file_id,message.caption)
        except TypeError or KeyError:
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
          print(message)
    elif message.caption:
      if "http" not in message.caption and "bazar" not in message.caption.lower():
        try:
          print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
          print(message.caption)
          app.send_message(TEST_CHAT,message.caption)
        except TypeError or KeyError:
          print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
          print(message)
app.run()