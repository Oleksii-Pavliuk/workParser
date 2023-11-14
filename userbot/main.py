from pyrogram import filters
from config import app,TARGET,TEST_CHAT,WORK_NEW_YORK

print('Started!')
@app.on_message(filters.channel)
def HandleMessage (client,message):
  print(message)
  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == TARGET and message.text:
    print('match')
    if 'http' not in message.text:
      try:
        client.send_message(WORK_NEW_YORK,message.text)
      except TypeError or KeyError:
        print('wrong key')
        print(message)
        print('------------------------------')
app.run()