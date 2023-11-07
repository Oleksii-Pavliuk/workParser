import config from "../config/config.mjs";
import { Database } from "../db/db.mjs";
const groups = config.get("groups");

const db = new Database('untagged');

export const tagAdd = (add) => {
  if(!add.title) return add;
  let tags = new Set();
  for ( const [key,values] of Object.entries(groups) ) {
    for (const value of values) {
      const pattern = new RegExp(`(?:^|[^A-Za-z0-9_])${value.toLowerCase()}(?:$|[^A-Za-z0-9_])`,'g');
      if (pattern.test(add.title.toLowerCase())){
        tags.add(key);
        break;
      }
    }
  }

  if (tags && tags.size) add.tags = [...tags];
  else db.appendUniqly('/',add)
  return add;

}