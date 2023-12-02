from datetime import datetime


def duplicate(app,client,message):
  it_send_to= -1001603020514
  it_origin = -1001963238259
  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == it_origin:
    if message.text:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.text)
        client.send_message(it_send_to,message.text)
      except TypeError or KeyError:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
    elif message.caption and message.photo and message.photo.file_id:

      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.caption)
        app.send_photo(it_send_to,message.photo.file_id,message.caption)
      except TypeError or KeyError:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
    elif message.caption:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.caption)
        app.send_message(it_send_to,message.caption)
      except TypeError or KeyError:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)