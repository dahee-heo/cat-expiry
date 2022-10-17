import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";

export const initialGroceriesState = {
  name: null,
  enter: null,
  expire: null,
}
export const groceriesState = atom({
  key: 'groceriesState',
  default: initialGroceriesState,
})

export const groceriesReadSelector = selector({
  key: 'groceriesReadSelector',
  get: async () => {
    // get(groceriesState);
    const data = await axios.get(`${process.env.REACT_APP_DATABASE_URL}/groceries.json`)
      .then((response) => {
        const groceries = [];
        for (const key in response.data) {

          //firebase key 만들어주기
          const grocery = response.data[key]
          grocery.key = key
          groceries.push(grocery)
        }
        return groceries
      });
    return data;
  }
})


