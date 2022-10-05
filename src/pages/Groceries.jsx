import React, { useEffect, useState } from 'react'
import { Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'
import { add, format } from 'date-fns'
import axios from 'axios'
import { useRecoilState } from 'recoil'

const Groceries = () => {
  const date = new Date();

  const [inputData, setInputData] = useState({
    name: null,
    enter: format(date, 'yyyy-MM-dd'),
    expire: format(add(date, { months: 2 }), 'yyyy-MM-dd'),
  })

  const [groceriesData, setGroceriesData] = useState([])

  useEffect(() => {
    groceriesRead()
  }, [])

  const changeHandle = function (e) {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }


  const databaseUrl = 'https://cat-expiry-default-rtdb.firebaseio.com/groceries.json'

  const groceriesCreate = async function (e) {
    e.preventDefault();

    await axios.post(databaseUrl, inputData)
      .then(() => {
        console.log('Data saved successfully!')
        groceriesRead()
      })
      .catch((error) => {
        console.log('The write failed...')
      });


  }

  const groceriesRead = async function () {
    const getGroceriesData = await axios.get(databaseUrl)
      .then((response) => {
        console.log('response: ', response);
        const groceries = [];
        for (const key in response.data) {

          //firebase key 만들어주기
          const grocery = response.data[key]
          grocery.key = key
          groceries.push(grocery)
        }

        console.log('groceries: ', groceries);
        setGroceriesData(groceries)
      });
  }


  async function groceriesDelete(key) {
    const url = 'https://cat-expiry-default-rtdb.firebaseio.com/groceries/' + key + '.json'
    await axios.delete(url)
      .then((response) => {
        console.log('Done delete', response)
        groceriesRead();
      }).catch((errer) => {
        console.log(errer)
      })
  }


  async function expireUpdate(grocery) {
    const url = 'https://cat-expiry-default-rtdb.firebaseio.com/groceries/' + grocery.key + '.json'
    const updateData = {
      ...grocery,
      expire: grocery.expire
    }
    return await axios.patch(url, updateData)
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
              groceriesData.map((grocery) => {
                // console.log('grocery: ', grocery.key);

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