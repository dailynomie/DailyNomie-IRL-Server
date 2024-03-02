import { writable } from "svelte/store";
import { closeModal, openModal } from "../../components/modal/ModalStore";
import type { SenderPayload } from "../../services/sender";
import { getTrackURL } from "../../services/sender";
import { getKeyFromStorage } from "../encryption/EncryptionStore";
import writeInstructionsSvelte from "./write-instructions.svelte";

export const CanNFC = writable<boolean>(false)

if ('NDEFReader' in window) {
  CanNFC.update(s=>true);
}

export const writeNFC = async (payload:SenderPayload):Promise<any>=>{

  if ('NDEFReader' in window) {
    openModal({
      id:'nfc-writer',
      component: writeInstructionsSvelte
    })
    const ndef = new window['NDEFReader']();
    const url = getTrackURL(payload, getKeyFromStorage());
    const wrote = await ndef.write({
      records: [{ recordType: "url", data: url }]
    })
    closeModal('nfc-writer');
    return wrote ? true : false;
  } else {
    setTimeout(()=>{
      closeModal('nfc-writer');
    },1000)
  }
  return false
}