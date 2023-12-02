from pyrogram import filters
from config import app,targets,TEST_CHAT
from bazar_to_chanell import bazar_to_chanell
from it_duplicationg import duplicate

print("Started!")
@app.on_message(filters.channel)
def HandleMessage (client,message):
    for target in targets:
      bazar_to_chanell(app,client,message,target)
    duplicate(app,client,message)
app.run()