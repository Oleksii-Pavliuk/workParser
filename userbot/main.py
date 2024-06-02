from pyrogram import filters
from config import app,targets,TEST_CHAT
from bazar_to_chanell import bazar_to_chanell
from it_duplicationg import duplicate
from datetime import datetime

# def run_telegram_bot():
print("Bot Started!")
channels = []
for target in targets:
  channels.append(target["target"])
@app.on_message(filters.chat(channels))
def HandleMessage (client,message):
  print(datetime,message)
  for target in targets:
    bazar_to_chanell(app,client,message,target)
  duplicate(app,client,message)
app.run()


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