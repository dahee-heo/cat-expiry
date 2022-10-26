import axios from "axios";
import { format, add } from "date-fns";
import { atom, selector, selectorFamily } from "recoil";

export const groceriesState = atom({
  key: 'grocieries',
  default: {
    name: null,
    enter: null,
    expire: null,
  }
})

export const postGroceries = selector({
  key: 'postGroceries',
  get: async ({ get }) => {
    const groceriesData = get(groceriesState)
    try {
      const url = process.env.REACT_APP_DATABASE_URL;
      const res = await axios.post(`${url}/groceries.json`, groceriesData)
      console.log('create done')
      return res;
    } catch (error) {
      console.log(error)
    }
  }
})

export const getGroceries = selector({
  key: 'getGroceries',
  get: async ({ get }) => {
    const groceriesData = get(groceriesState)
    try {
      const url = process.env.REACT_APP_DATABASE_URL;
      const res = await axios.get(`${url}/groceries.json`)
      const groceries = [];
      for (const key in res.data) {
        groceries.push(res.data[key])
      }
      return groceries;
    } catch (error) {
      console.log(error)
    }
  }
})