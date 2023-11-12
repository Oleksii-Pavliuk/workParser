from pyrogram import filters
from config import app,TARGET,TEST_CHAT

print('Started!')
@app.on_message(filters.channel)
def HandleMessage (client,message):
  if message.sender_chat and message.sender_chat.id and str(message.sender_chat.id) == TARGET:
    if 'http' not in message.text:
      client.send_message(TEST_CHAT,message.text)


app.run()