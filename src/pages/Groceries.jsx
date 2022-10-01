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
    // const query = ref(db, 'groceries');
    // return onValue(query, (snapshot) => {
    //   const data = snapshot.val();

    //   if (snapshot.exists()) {
    //     Object.values(data).map((grocery) => {
    //       setGroceries((groceries) => [...groceries, grocery])
    //     });
    //   }
    // })
    groceriesRead()
  }, [])

  async function changeHandle(e) {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }

  // const groceriesCollectionRef = collection(db, 'groceries')

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
    // console.log(getGroceriesData)
    // const { data } = getGroceriesData
    // console.log('data: ', data);
    // console.log('groceriesData: ', groceriesData);
  }




  // async function getData() {
  //   const q = query(collection(db, "groceries"));
  //   const querySnapshot = await getDocs(q);
  //   console.log('querySnapshot: ', querySnapshot);
  //   const newData = querySnapshot.docs.map(doc => ({
  //     ...doc.data()
  //   }))
  //   setGroceries(newData)
  //   console.log('groceries: ', groceries);
  //   // querySnapshot.forEach((doc) => {
  //   //   console.log(doc.id, " => ", doc.data());
  //   // });
  // }

  // useEffect(() => {
  //   getData()
  // }, [])


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