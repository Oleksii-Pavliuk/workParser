from datetime import datetime
from bazar_scrape import scrape_phone
from settings import log


rusrek_static_texts = [
    "🎯 Работа - требуются / Разное 🎯",
    "👉 ВСЕ ОБЪЯВЛЕНИЯ НА RUSREK.COM",
    "👉 ПОДПИСАТЬСЯ @rusrek_com",
    "🤖 НАШ БОТ @rusrekbot_bot"
    "rusrek"
    "RUSREK"
    "Rusrec"
]


def rusrek_to_chanell(app,client,message,target):
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
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message)
        text = clean_rusrek_message(message.text)
        # website_phone = check_phone(message)
        # if website_phone:
        #   text = text + f"\nКонтакты:\n📲 +{website_phone}"
        text = text + signature
        client.send_message(send_to_chat,text)
        log(client,f"Send message: {text} \nto: {app.get_chat(send_to_chat).title}")
      except Exception as e:
        print(e)
        log(client,f"Failed to send message: {message.text} \nto: {app.get_chat(send_to_chat).title}",e)
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
    elif message.caption and message.photo and message.photo.file_id:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message)
        text = clean_rusrek_message(message.caption)
        log(client,f"Send message: {text} \nto: {app.get_chat(send_to_chat).title}")
        text = text + signature
        app.send_photo(send_to_chat,message.photo.file_id,text)
      except Exception as e:
        print(e)
        log(client,f"Failed to send message: {message.text} \nto: {app.get_chat(send_to_chat).title}",e)
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))
    elif message.caption:
      try:
        print("{datetime} ----------------------------- match".format(datetime=datetime.now()))
        print(message)
        text = clean_rusrek_message(message.caption)
        log(client,f"Send message: {text} \nto: {app.get_chat(send_to_chat).title}")
        text = text + signature
        app.send_message(send_to_chat,text)
      except Exception as e:
        print(e)
        log(client,f"Failed to send message: {message.text} \nto: {app.get_chat(send_to_chat).title}",e)
        print("{datetime} ------------------------- wrong key".format(datetime=datetime.now()))




def clean_rusrek_message(input_text):
  for static_text in rusrek_static_texts:
      input_text = input_text.replace(static_text, '')

  return input_text.strip()



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