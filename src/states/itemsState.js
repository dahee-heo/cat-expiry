import { add, format } from "date-fns";
import { atom, selector } from "recoil";
import { itemsRead } from "../service/items.service";
import { users } from "./userState";

export const itemsState = atom({
  key: 'itemsState',
  default: []
})

export const countState = atom({
  key: 'countState',
  default: 0
})

// export const countSelector = selector({
//   key: 'countSelector',
//   get: async ({ get }) => {
//     let count = get(countState)
//     const loginUser = get(users)
//     const uid = loginUser.uid
//     const response = await itemsRead(uid)
//     for (const key in response.data) {
//       const item = response.data[key]
//       if (format(add(new Date(), { days: 3 }), 'yyyy-MM-dd') >= item.expire) count++
//     }
//     return count;
//   }
// })
