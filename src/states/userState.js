import { atom, selector, selectorFamily } from "recoil";


export const users = atom({
  key: 'users',
  default: {
    name: null,
    enter: null,
    expire: null,
    done: false,
  }
})