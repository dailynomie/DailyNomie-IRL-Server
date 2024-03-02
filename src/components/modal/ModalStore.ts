import type { SvelteComponentDev } from "svelte/internal"
import { writable } from "svelte/store";

export type ModalType = {
  id: string,
  component: any,
  props?: any
}

type ModalStoreType = Array<ModalType>;

export const ModalStore = writable<ModalStoreType>([]);

export const openModal = (modalType:ModalType)=>{
  ModalStore.update(s=>{
    return [...s,...[modalType]]
  })
}

export const closeModal = (id:string)=>{
  ModalStore.update(s=>{
    return s.filter(m=>m.id !== id)
  })
}