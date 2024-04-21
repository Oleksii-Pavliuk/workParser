from datetime import datetime
from settings import log


def duplicate(app,client,message):
  it_send_to= -1001603020514
  it_origin = -1001963238259
  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == it_origin:
    if message.text:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.text)
        log(message,None)
        client.send_message(it_send_to,message.text)
      except (Exception,) as e:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
        log(message,e)
    elif message.caption and message.photo and message.photo.file_id:

      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.caption)
        log(message,None)
        app.send_photo(it_send_to,message.photo.file_id,message.caption)
      except (Exception,) as e:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
        log(message,e)

    elif message.caption:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.caption)
        log(message,None)
        app.send_message(it_send_to,message.caption)
      except (Exception,) as e:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
        log(message,e)
