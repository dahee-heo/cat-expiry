import React, { useEffect, useState } from 'react'
import {
  Edit,
  KeyboardArrowUp,
  KeyboardArrowDown,
  RemoveCircle,
} from '@material-ui/icons'
import { FormControl, Input } from '@material-ui/core'
import { add, format } from 'date-fns'
import { useRecoilState } from 'recoil'
import { groceriesState } from '../states/groceriesState'
import { itemsState } from '../states/itemsState'
import { itemsDelete, itemsRead, itemsUpdate } from '../service/items.service'
import { groceriesCreate, groceriesDelete, groceriesRead, groceriesUpdate } from '../service/groceries.service'

const Groceries = () => {

  const [grocereisData, setGroceriesData] = useRecoilState(groceriesState)
  const [itemsData, setItemsData] = useRecoilState(itemsState)

  const [inputData, setInputData] = useState({
    name: null,
    enter: format(new Date(), 'yyyy-MM-dd'),
    expire: format(add(new Date(), { months: 2 }), 'yyyy-MM-dd'),
    done: false,
  })


  useEffect(() => {
    loadGroceries()
  }, [grocereisData])


  const handleInput = e => {
    setInputData({ ...inputData, name: e.target.value })
  }


  const loadGroceries = async () => {
    const promises = [];

    promises[0] = new Promise(function (resolve, reject) {
      groceriesRead().then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
    promises[1] = new Promise(function (resolve, reject) {
      itemsRead().then((response) => {
        // let count = 0;
        // for (const key in response.data) {
        //   const item = response.data[key];
        // }
        resolve(response.data)
      }).catch((error) => {
        reject(error);
      })
    })
    Promise.all(promises).then((result) => {
      const groceriesPromise = result[0]
      const itemsPromise = result[1] || [];
      const groceries = []

      for (const key in groceriesPromise) {
        const grocery = groceriesPromise[key];
        grocery.key = key;
        grocery.hasItem = itemsPromise[key]
        groceries.push(grocery)
        setGroceriesData([...groceries])
      }
    }).catch(error => {
      console.log(error)
    })
  }



  const editExpire = async (grocery, e) => {
    try {
      const editExpire = {
        expire: e.target.value
      }
      await groceriesUpdate(grocery, editExpire)
      loadGroceries()
    } catch (error) {
      console.log(error);
    }
  }

  const onChange = async (e, grocery) => {
    if (e.target.checked) {
      itemsUpdate(grocery)
    } else {
      itemsDelete(grocery)
    }
  }




  return (
    <main>
      <FormControl>
        <Input type="text" placeholder='식료품명을 입력해주세요.' name='name' onChange={(e) => handleInput(e)} />
        <button onClick={groceriesCreate}><Edit /></button>
      </FormControl>

      <div>

        <table>
          <thead>
            <tr>
              <th>Move</th>
              <th>
                <span>
                  Name
                  <span><KeyboardArrowUp /></span>
                  <span><KeyboardArrowDown /></span>
                </span>
              </th>
              <th>
                <span>
                  Enter
                  <span><KeyboardArrowUp /></span>
                  <span><KeyboardArrowDown /></span>
                </span>
              </th>
              <th>
                <span>
                  Expire
                  <span><KeyboardArrowUp /></span>
                  <span><KeyboardArrowDown /></span>
                </span>
              </th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {
              grocereisData.map((grocery) => {
                return (
                  <tr key={grocery.key}>
                    <td>
                      <input type='checkbox'
                        checked={grocery.hasItem}
                        onChange={(e) => onChange(e, grocery)}
                      />
                    </td>
                    <td>{grocery.name}</td>
                    <td>{grocery.enter}</td>
                    <td><input
                      type='date'
                      defaultValue={grocery.expire}
                      onChange={(e) => {
                        editExpire(grocery, e)
                      }
                      }
                    /></td>
                    <td>
                      <button
                        onClick={() => groceriesDelete(grocery.key)}
                      ><span><RemoveCircle /></span></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </main >
  )
}

export default Groceries