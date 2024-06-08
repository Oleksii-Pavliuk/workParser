from pyrogram import filters
from config import app,targets,logs_chat
from bazar_to_chanell import bazar_to_chanell
from it_duplicationg import duplicate
from datetime import datetime
from settings import log

# def run_telegram_bot():
channels = [target["target"] for target in targets]

@app.on_disconnect()
def on_disconnect(client):
  log(client,"Disconnected")

@app.on_message(filters.chat(channels))
def handle_message(client, message):
  print(message)
  log(client,f"Received message: {message.text} \nfrom: {message.chat.title}")
  processing = False
  for target in targets:
    if message.chat.id == target.get("target") and target.get("chat_duplication",False):
      log(client,f"Duplicating message: {message.text} \nfrom: {message.chat.title} \nto: {app.get_chat(target.get('send_to')).title}")
      processing = True
      duplicate(app, client, message)
    elif message.chat.id == target.get("target"):
      log(client,f"Processing message: {message.text} \nfrom: {message.chat.title}")
      processing = True
      bazar_to_chanell(app, client, message, target)
  if not processing:
    log(client,f"Skipping message from: {message.chat.title}")

def run_telegram_bot():
  app.run()

if __name__ == "__main__":
  run_telegram_bot()

# def run_flask():
#   # Set helth check with flask
#   flask_app = Flask(__name__)

#   @flask_app.route("/health", methods=["GET"])
#   def health():
#       try:
#           return Response(status=200)
#       except ConnectionError as e:
#           print(f"Error: {str(e)}")
#           return Response(status=500)

#       except Exception as e:
#           print(f"Error: {str(e)}")
#           return Response(status=500)

#   print("Flask Started!")
#   flask_app.run(host='0.0.0.0', port=8000)



# setup()
# if __name__ == '__main__':
#     p1 = multiprocessing.Process(name='p1', target=run_telegram_bot)
#     p = multiprocessing.Process(name='p', target=run_flask)
#     p1.start()
#     p.start()

# run_telegram_bot()