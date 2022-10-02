import React, { useEffect, useState } from 'react'
import { Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'
import { db } from '../firebase'
import { getDatabase, onValue, ref, set } from '@firebase/database'
import { addDoc, collection, doc, getDoc, getDocs, query } from '@firebase/firestore'
import { add, format } from 'date-fns'
import axios from 'axios'

const Groceries = () => {
  const [inputData, setInputData] = useState({
    name: null,
    enter: new Date(),
    expire: add(new Date(), { months: 2 }),
  })

  const [groceriesData, setGroceriesData] = useState([])

  useEffect(() => {
    groceriesRead()
  }, [])

  async function changeHandle(e) {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }


  const databaseUrl = 'https://cat-expiry-default-rtdb.firebaseio.com/groceries.json'

  async function groceriesCreate(e) {
    e.preventDefault();
    axios.post(databaseUrl, inputData)
      .then(() => {
        console.log('Data saved successfully!')
      })
      .catch((error) => {
        console.log('The write failed...')
      });
    groceriesRead()
  }

  async function groceriesRead() {
    const getGroceriesData = await axios.get(databaseUrl)
      .then((response) => {
        console.log('response: ', response);
        const groceries = [];
        for (const key in response.data) {
          groceries.push(response.data[key])
        }
        setGroceriesData(groceries)
      });
  }






  return (
    <main>
      <form onSubmit={groceriesCreate}>
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
            {
              groceriesData.map((grocery) => {
                return (
                  <tr key={grocery.key}>
                    <td><input type='checkbox' /></td>
                    <td>{grocery.name}</td>
                    <td>{grocery.enter}</td>
                    <td><input type='date' defaultValue={grocery.expire}
                    /></td>
                    <td>
                      <button><span><RemoveCircle /></span></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Groceries