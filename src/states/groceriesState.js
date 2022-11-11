import axios from "axios";
import { format, add } from "date-fns";
import { atom, selector, selectorFamily } from "recoil";


export const groceriesState = atom({
  key: 'groceriesState',
  default: []
})