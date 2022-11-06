import React, { useEffect, useState } from 'react'
import {
  Edit,
  KeyboardArrowUp,
  KeyboardArrowDown,
  RemoveCircle,
} from '@material-ui/icons'
import { FormControl, Input } from '@material-ui/core'
import { add, format } from 'date-fns'
import axios from 'axios'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { groceriesState } from '../states/groceriesState'
import { addItems, itemsState } from '../states/itemsState'

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

  useEffect(() => {
    console.log(grocereisData)
  }, [])


  const url = process.env.REACT_APP_DATABASE_URL;


  const handleInput = e => {
    setInputData({ ...inputData, name: e.target.value })
  }


  const loadGroceries = async () => {
    try {
      const response = await axios.get(`${url}/groceries.json`)
      const groceries = []
      for (const key in response.data) {
        const grocery = response.data[key]
        grocery.key = key
        groceries.push(grocery)
      }
      setGroceriesData([...groceries])
    } catch (error) {
      console.log(error);
    }
  }


  const addGroceries = async (e) => {
    try {
      const response = await axios.post(`${url}/groceries.json`, inputData)
    } catch (error) {
      console.log(error)
    }
  }


  const deleteGrocereis = async (key) => {
    try {
      await axios.delete(`${url}/groceries/${key}.json`)
    } catch (error) {
      console.log(error);
    }
  }


  const editGroceries = async (grocery, e) => {
    try {
      const editExpire = {
        expire: e.target.value
      }
      const response = await axios.patch(`${url}/groceries/${grocery.key}.json`, editExpire)
      loadGroceries()
    } catch (error) {
      console.log(error);
    }
  }



  const addItems = async (e) => {
    try {
      const response = await axios.post(`${url}/groceries.json`, inputData)
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = async (e, grocery) => {
    if (e.target.checked === true) {

      // response = await axios.post(`${url}/groceries.json`, inputData)
    }
  }




  return (
    <main>
      <FormControl>
        <Input type="text" name='name' onChange={(e) => handleInput(e)} />
        <button onClick={addGroceries}><Edit /></button>
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
                        checked={grocery.done}

                      />
                    </td>
                    <td>{grocery.name}</td>
                    <td>{grocery.enter}</td>
                    <td><input
                      type='date'
                      defaultValue={grocery.expire}
                      onChange={(e) => {
                        editGroceries(grocery, e)
                      }
                      }
                    /></td>
                    <td>
                      <button
                        onClick={() => deleteGrocereis(grocery.key)}
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