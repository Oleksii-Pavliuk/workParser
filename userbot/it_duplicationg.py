from datetime import datetime
from settings import log


def duplicate(app,client,message,target):
  it_send_to= target.get("send_to")
  it_origin = target.get("target")
  if message.sender_chat and message.sender_chat.id and message.sender_chat.id == it_origin:
    if message.text:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.text)
        client.send_message(it_send_to,message.text)
        log(client,f"Send message: {message.text} \nto: {app.get_chat(it_send_to).title}")
      except (Exception,) as e:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
        log(client,f"Failed to send message: {message.text} \nto: {app.get_chat(it_send_to).title}",e)
    elif message.caption and message.photo and message.photo.file_id:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.caption)
        app.send_photo(it_send_to,message.photo.file_id,message.caption)
        log(client,f"Send message: {message.text} \nto: {app.get_chat(it_send_to).title}")
      except (Exception,) as e:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
        log(client,f"Failed to send message: {message.text} \nto: {app.get_chat(it_send_to).title}",e)


    elif message.caption:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message.caption)
        app.send_message(it_send_to,message.caption)
        log(client,f"Send message: {message.text} \nto: {app.get_chat(it_send_to).title}")
      except (Exception,) as e:
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
        print(message)
        log(client,f"Failed to send message: {message.text} \nto: {app.get_chat(it_send_to).title}",e)

