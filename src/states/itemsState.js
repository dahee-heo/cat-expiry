import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";


export const itemsState = atom({
  key: 'itemsState',
  default: []
})

