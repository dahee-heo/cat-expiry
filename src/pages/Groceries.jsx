import React, { useEffect, useState } from 'react'
import { Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle, } from '@material-ui/icons'
import { FormControl, Input } from '@material-ui/core'
import { add, format } from 'date-fns'
import axios from 'axios'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { checkedState, getGroceries, groceriesState, itemUpdateSelector, postGroceries } from '../states/testState'

const Groceries = () => {

  const [inputData, setInputData] = useState({
    name: null,
    enter: format(new Date(), 'yyyy-MM-dd'),
    expire: format(add(new Date(), { months: 2 }), 'yyyy-MM-dd'),
  })
  const [groceries, setGroceries] = useRecoilState(groceriesState)
  const [post, setPost] = useRecoilState(postGroceries)
  const getData = useRecoilValue(getGroceries)

  const url = process.env.REACT_APP_DATABASE_URL;
  useEffect(() => {
    console.log(getData)
  }, [])
  return (
    <main>
      <FormControl>
        <Input type="text" name='name' onChange={(e) => { setInputData({ ...inputData, name: e.target.value }) }} />
        <button onClick={e => {
          e.preventDefault()
          setGroceries(inputData)
        }}><Edit /></button>
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
              getData.map((grocery) => {

                return (
                  <tr key={grocery.key}>
                    <td><input type='checkbox'
                    /></td>
                    <td>{grocery.name}</td>
                    <td>{grocery.enter}</td>
                    <td><input
                      type='date'
                      defaultValue={grocery.expire}
                      onChange={(e) => {
                        grocery.expire = e.target.value;
                      }}
                    /></td>
                    <td>
                      <button ><span><RemoveCircle /></span></button>
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