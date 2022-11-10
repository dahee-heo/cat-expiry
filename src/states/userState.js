import { atom, selector, selectorFamily } from "recoil";


export const users = atom({
  key: 'users',
  default: {
    displayName: null,
    email: null,
    uid: null,
  }
})