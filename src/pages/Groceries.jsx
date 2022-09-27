import React, { useState } from 'react'
import { Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'
import { db } from '../firebase'
import { addDoc, collection, getDocs, query } from '@firebase/firestore'
import { add, format } from 'date-fns'

const Groceries = () => {
  const [inputData, setInputData] = useState({
    name: null,
    enter: new Date(),
    expire: add(new Date(), { months: 2 }),
  })

  async function changeHandle(e) {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }

  const groceriesCollectionRef = collection(db, 'groceries')

  async function addData(e) {
    e.preventDefault();
    const res = await addDoc(groceriesCollectionRef, inputData)
  }



  return (
    <main>
      <form onSubmit={addData}>
        <input type="text" name='name' onChange={changeHandle} />
        <button><Edit /></button>
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
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td>조공 츄르</td>
              <td>2022-09-23</td>
              <td><input type='date' defaultValue='2023-09-23' /></td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>오메가3</td>
              <td>2022-07-10</td>
              <td><input type='date' defaultValue='2023-01-10' /></td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>템테이션</td>
              <td>2022-06-19</td>
              <td><input type='date' defaultValue='2023-06-19' /></td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>로얄캐닌 헤파틱</td>
              <td>2022-08-20</td>
              <td><input type='date' defaultValue='2025-08-20' /></td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Groceries