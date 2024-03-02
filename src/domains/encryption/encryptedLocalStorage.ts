import { writable } from "svelte/store"
import { decryptObject, encryptObject } from "../../services/encrypt";

type StorageMap = {[key:string]:any};
const STORE_KEY = "estore";
const createEncryptedStorage = ()=>{
  const { subscribe, set, update } = writable<StorageMap>({})
  
  let key:string;

  const init = async (_key:string) => {
    key = _key;
    update(s=>getFromStorage())
    subscribe(s=>{
      if(s) {
        writeToStorage(s);
      }
    })
    console.log("initialized encrypted storage")
  }

  const writeToStorage = (state:StorageMap)=>{
    localStorage.setItem(STORE_KEY, encryptObject(state, key));
  }

  const getFromStorage = ():StorageMap=>{
    const base = localStorage.getItem(STORE_KEY);
    if(base) return decryptObject(base, key);
    return {}
  }

  return {
    init,
    subscribe,
    set,
    update
  }
}

export const EncryptedStorage = createEncryptedStorage();