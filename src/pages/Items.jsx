import React, { useEffect, useState } from 'react'
import { SearchOutlined, Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'
import axios from 'axios'
// import { groceries } from '../states/groceriesState'
import { useRecoilState } from 'recoil'

const Items = () => {

  const [itemsData, setItemsData] = useState([])

  useEffect(() => {
    itemsRead()
  }, [])

  const url = process.env.REACT_APP_DATABASE_URL;


  const itemsRead = async () => {
    try {
      const response = await axios.get(`${url}/items.json`)
      const itemsList = [];
      itemsList.push(response)
      setItemsData(itemsList)
    } catch (error) {
      console.log(error)
    }
  }

  const itemsDelete = async (key) => {
    try {
      const res = await axios.delete(`${url}/items/${key}.json`)
      itemsRead()
    } catch (error) {
      console.log(error)
    }
  }

  const itemsUpdate = async (grocery) => {
    try {
      const updateData = {
        ...grocery,
        expire: grocery.expire,
      }
      const res = await axios.patch(`${url}/items/${grocery.key}.json`)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <main>
      <form>
        <input type="text" name='name' />
        <button><SearchOutlined /></button>
      </form>

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
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {
              itemsData.map((grocery, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{grocery.name}</td>
                    <td>{grocery.enter}</td>
                    <td>{grocery.expire}</td>
                    <td>
                      <button><span><Edit /></span></button>
                    </td>
                    <td>
                      <button><span><RemoveCircle /></span></button>
                    </td>
                  </tr>
                )
              })
            }
            {/* <tr>
              <td>1</td>
              <td>조공 츄르</td>
              <td>2022-09-23</td>
              <td>2023-09-23</td>
              <td>
                <button><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>오메가3</td>
              <td>2022-07-10</td>
              <td>2023-01-10</td>
              <td>
                <button><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>템테이션</td>
              <td>2022-06-19</td>
              <td>2023-06-19</td>
              <td>
                <button><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>로얄캐닌 헤파틱</td>
              <td>2022-08-20</td>
              <td>2025-08-20</td>
              <td>
                <button><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

    </main>
  )
}

export default Items