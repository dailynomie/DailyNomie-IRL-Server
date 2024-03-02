import { writable } from "svelte/store";
import Crypter from "cryptr";
import { openModal } from "../../components/modal/ModalStore";
import PasscodeModal from "../pass-code/passcode-modal.svelte";
import hash from "hash.js";
const KEYPATH = 'pk';


export const getKeyFromStorage = ():string|undefined=>{
  return localStorage.getItem(KEYPATH);
}

export const InvalidKey = writable(false);
export const EncryptionKey = writable<undefined|string>(getKeyFromStorage());

EncryptionKey.subscribe(s=>{
  if(s) {
    localStorage.setItem(KEYPATH, s);
  } else {
    localStorage.removeItem(KEYPATH);
  }
})

export const setEncryptionKey = (key:string)=>{
  EncryptionKey.update(s=> hash.sha1().update(key).digest('hex'));
}

export const deleteEncryptionKey = ()=>{
  EncryptionKey.update(s=>undefined);
  openPasscodeModal();
}

export const openPasscodeModal = (canClose:boolean = false)=>{
  openModal({
    id: 'passcode',
    component: PasscodeModal,
    props: {
      canClose
    }
  })
}

export const initEncryption = ()=>{
  const key = getKeyFromStorage();
  if(!key) {
    openPasscodeModal(false)
  }
}



