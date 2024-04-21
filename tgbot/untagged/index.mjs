import config from "../config/config.mjs"
import { Database } from "../db/db.mjs"
import { customLog } from "../common/log.mjs";


export const untaggedJob = async (bot,channel) => {
  try{
    const db = new Database('untagged');
    const chatId = config.get(channel);
    let entries = db.getUniq('/');
    if (entries) {
      let delay = 0;
      let count = 0;
      for (const [index, entry] of entries.entries()){
        if (count > 9) break;
        if (!entry.sent){
          try{
            setTimeout(() => bot.sendMessage(chatId, entry.longText, {'parse_mode': 'HTML'}),
            delay);
          }catch(err){
            console.log(err);
          }
          delay += 10000;
          entry.sent = true;
          entries[index] = entry;
          count++;
        }
      }
      customLog(`sent ${count} untagged messages sent, ${entries.length} left in db`)
      db.set('/',entries);
    }
  }catch(err){
    console.log(err);
    customLog(err);
  }
}