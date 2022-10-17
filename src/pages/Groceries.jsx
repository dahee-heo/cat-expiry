import React, { useEffect, useState } from 'react'
import { Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'
import { add, format } from 'date-fns'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { groceriesGet, groceriesReadSelector, groceriesState } from '../states/groceriesState'

const Groceries = () => {
  const date = new Date();

  const [inputData, setInputData] = useState({
    name: null,
    enter: format(date, 'yyyy-MM-dd'),
    expire: format(add(date, { months: 2 }), 'yyyy-MM-dd'),
  })

  const [groceriesData, setGroceriesData] = useRecoilState(groceriesState)
  const groceriesGetList = useRecoilValue(groceriesReadSelector)
  console.log('groceriesGetList: ', groceriesGetList);


  // useEffect(() => {
  //   groceriesRead()
  // }, [])

  const changeHandle = function (e) {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }

  const url = process.env.REACT_APP_DATABASE_URL;

  const groceriesCreate = async function (e) {
    e.preventDefault();

    await axios.post(`${url}/groceries.json`, inputData)
      .then(() => {
        console.log('Data saved successfully!')
        // groceriesRead()
      })
      .catch((error) => {
        console.log('The write failed...')
      });


  }

  // const groceriesRead = async function () {
  //   // setGroceriesData(groceriesGetList)
  //   // console.log('groceriesData: ', groceriesData);
  //   // groceriesGetList
  //   console.log('groceriesGetList: ', groceriesGetList);
  // }


  async function groceriesDelete(key) {
    await axios.delete(`${url}/groceries/${key}.json`)
      .then((response) => {
        console.log('Done delete', response)
        // groceriesRead();
      }).catch((errer) => {
        console.log(errer)
      })
  }


  async function expireUpdate(grocery) {
    const updateData = {
      ...grocery,
      expire: grocery.expire
    }
    return await axios.patch(`${url}/groceries/${grocery.key}.json`, updateData)
    // .then((response) => {
    //   groceriesRead()
    // })
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
              groceriesGetList.map((grocery) => {

                return (
                  <tr key={grocery.key}>
                    <td><input type='checkbox' /></td>
                    <td>{grocery.name}</td>
                    <td>{grocery.enter}</td>
                    <td><input
                      type='date'
                      defaultValue={grocery.expire}
                      onChange={(e) => {
                        grocery.expire = e.target.value;
                        expireUpdate(grocery)
                      }}
                    /></td>
                    <td>
                      <button onClick={() => groceriesDelete(grocery.key)}><span><RemoveCircle /></span></button>
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