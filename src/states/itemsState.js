import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";


export const itemsState = atom({
  key: 'itemsState',
  default: []
  // {
  //   name: null,
  //   enter: null,
  //   expire: null,
  //   done: false,
  // }
})

