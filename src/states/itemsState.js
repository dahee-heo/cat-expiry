import { atom, selector } from "recoil";

export const itemsState = atom({
  key: 'itemsState',
  default: []
})

export const countState = atom({
  key: 'countState',
  default: 0
})

