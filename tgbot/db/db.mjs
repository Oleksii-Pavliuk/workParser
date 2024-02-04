import _ from "lodash";
import fs from "fs";

export class Database {
  #name;
  #data;
  #listeners = [];

  constructor(string) {
    if (!string || typeof string !== 'string' || string.includes(' ')) {
      console.log(string);
      throw new Error('Invalid name provided. Name should be a single word without spaces.');
    }
    this.#name = string;
    this.#loadDatabase();
  }

  #loadDatabase() {
    try{
      let file = fs.readFileSync(`db/${this.#name}.json`);
      this.#data = JSON.parse(file);
    }catch(err){
      this.#data = {};
    }

    if (!this.#data) this.#data = {};
  }

  #saveDatabase() {
    fs.writeFileSync(`db/${this.#name}.json`,JSON.stringify(this.#data,null,2));
  }

  get(path) {
    if(path === '/') {
      return this.#data;
    }

    const keys = path.split('/').filter(Boolean);

    let current = this.#data;
    for (const key of keys) {
      if(!current[key]) return undefined;
      current = current[key];
    }
    return current;
  }


  set(path,value) {
    try{
      if(this.#listeners[path]){
        this.#listeners[path](path);
      }
      if(path === '/') {
        this.#data = value;
        this.#saveDatabase()
        return this.#data;
      }

      const keys = path.split('/').filter(Boolean);

      const target = keys.pop();

      let current = this.#data;
      for (const key of keys){
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[target] = value;
      this.#saveDatabase();
      return value;
    }catch(err){
      throw new Error(err);
    }
  }

  clear(path) {
    try{
      if(path === '/') {
        this.#data = [];
        this.#saveDatabase()
        return this.#data;
      }

      const keys = path.split('/').filter(Boolean);

      const target = keys.pop();

      let current = this.#data;
      for (const key of keys){
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[target] = [];
      this.#saveDatabase();
      return [];
    }catch(err){
      throw new Error(err);
    }
  }

  append(path,value) {
    try{
      let one = this.get(path);
      if (!one || _.isEmpty(one)){
        let data = [value];
        this.set(path,data);
      } else {
        let ret = this.get(path);
        let data = [...ret,value];
        this.set(path,data);
      }
      return value;
    }catch(err){
      throw new Error(err);
    }
  }

  appendUniqly(path,value) {
    try{
      let one = this.get(path);
      if (!one || _.isEmpty(one)){
        let data = [value];
        this.set(path,data);
      } else {
        let ret = this.get(path);
        ret = [...ret].map(obj => JSON.stringify(obj))
        let data = [...new Set([...ret,JSON.stringify(value)])];
        data = data.map(obj => JSON.parse(obj))
        this.set(path,data);
      }
      return value;
    }catch(err){
      throw new Error(err);
    }
  }

  getUniq(path) {
    try{
      let one = this.get(path);
      let data = false;
      if (_.isArray(one)){
        one = one.map(obj => JSON.stringify(obj))
        data = [...new Set(one)];
        data = data.map(obj => JSON.parse(obj))
      }
      return data;
    }catch(err){
      throw new Error(err);
    }
  }

  unify(path) {
    try{
      let one = this.get(path);
      let data = false;
      if (_.isArray(one)){
        one = [...one].map(obj => JSON.stringify(obj))
        let data = [...new Set([...one,JSON.stringify(value)])];
        data = data.map(obj => JSON.parse(obj))
      }
      this.set(path,data);
      return data;
    }catch(err){
      throw new Error(err);
    }
  }

  onUpdate(path,callback) {
    this.#listeners[path] = callback;
  }

  getListners(){
    return this.#listeners;
  }
}