import { writable } from "svelte/store";
import { closeModal, openModal } from "../../components/modal/ModalStore";
import type { SenderPayload } from "../../services/sender";
import tagEditorSvelte from "./tag-editor.svelte";
import tagQrcodeModalSvelte from "./tag-qrcode-modal.svelte";

export const showEditor = (payload:SenderPayload):void=>{
  openModal({
    id:'editor',
    component: tagEditorSvelte,
    props: { payload }
  })
  // EditorModalStore.update(s=>{
  //   return payload;
  // })
}


export const closeEditor = ():void=>{
  closeModal('editor');
  // EditorModalStore.update(s=>{
  //   return undefined
  // })
}

export const EditorModalStore = writable<undefined|SenderPayload>(undefined);
export const QrModalStore = writable<undefined|SenderPayload>(undefined);

export const showQR = (payload:SenderPayload):void=>{
  openModal({
    id: 'show-qr',
    component: tagQrcodeModalSvelte,
    props: { payload }
  })
  // QrModalStore.update(s=>{
  //   return payload;
  // })
}



export const closeQR = ():void=>{
  closeModal('show-qr')
  // QrModalStore.update(s=>{
  //   return undefined
  // })
}

export const createNewTag = () => {
  const payload: SenderPayload = {
    note: "",
    key: "",
    v: "dn6",
    id: undefined,
    geo: true,
    server: "",
  };
  
  showEditor(payload);
};
