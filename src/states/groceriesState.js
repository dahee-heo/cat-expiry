import axios from "axios";
import { format, add } from "date-fns";
import { atom, selector, selectorFamily } from "recoil";


export const groceriesState = atom({
  key: 'groceriesState',
  default: []
  // {
  //   name: null,
  //   enter: null,
  //   expire: null,
  //   done: null,
  // }
})

// const url = process.env.REACT_APP_DATABASE_URL

// export const getGroceries = selector({
//   key: 'getGroceries',
//   get: async () => {
//     const response = await axios.get(`${url}/groceries.json`);
//     const groceries = []
//     for (const key in response.data) {
//       const grocery = response.data[key]
//       grocery.key = key
//       groceries.push(grocery)
//     }
//     return groceries;
//   }
// });

// export const addGroceries = selectorFamily({
//   key: 'addGroceries',
//   // get: async ({ get }) => {
//   //   const grocereis = get(groceries)
//   //   await axios.post(`${url}/groceries.json`, grocereis)
//   // },
//   set: (inputData) => async ({ get, set }, newValue) => {
//     const groceries = get(groceries)
//     set(newValue = inputData)
//   }
// })