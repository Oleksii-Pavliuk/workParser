from pyrogram import filters
from config import app,TARGET,TEST_CHAT,WORK_NEW_YORK

print('Started!')
@app.on_message(filters.channel)
def HandleMessage (client,message):
  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == TARGET:
    print('match')
    if message.text:
      if 'http' not in message.text:
        try:
          client.send_message(WORK_NEW_YORK,message.text)
        except TypeError or KeyError:
          print('wrong key')
          print(message)
          print('------------------------------')
    elif message.caption and message.photo and message.photo.file_id:
      if 'http' not in message.caption:
        try:
          app.send_photo(WORK_NEW_YORK,message.photo.file_id,message.caption)
        except TypeError or KeyError:
          print('wrong key')
          print(message)
          print('------------------------------')
    elif message.caption:
      if 'http' not in message.caption:
        try:
          app.send_message(WORK_NEW_YORK,message.caption)
        except TypeError or KeyError:
          print('wrong key')
          print(message)
          print('------------------------------')
app.run()