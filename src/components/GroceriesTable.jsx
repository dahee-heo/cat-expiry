import React, { useEffect } from 'react'
import { groceriesDelete, groceriesRead, groceriesUpdate } from '../service/groceries.service'
import { itemsDelete, itemsRead, itemsUpdate } from '../service/items.service'
import { DeleteBtn, TableStyle } from './styled.js'
import { KeyboardArrowDownSharp, KeyboardArrowUpSharp, RemoveCircleOutline } from '@mui/icons-material'
import { NavLink, useSearchParams } from 'react-router-dom'
import _ from 'lodash'


const GroceriesTable = ({ uid, _data, grocereisData, setGroceriesData }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';

  useEffect(() => {
    if (uid) {
      loadGroceries(orderByName, orderByType)
    }
  }, [orderByName, orderByType, uid])

  const onChecked = async (e, grocery) => {
    if (e.target.checked) {
      itemsUpdate(grocery)
    } else {
      itemsDelete(grocery)
    }
  }

  const activeClass = function (_orderByName, _orderByType) {
    if (orderByName === _orderByName && orderByType === _orderByType) {
      return ' active';
    } else {
      return '';
    }
  }

  const editExpire = async (grocery, e) => {
    try {
      const editExpire = {
        expire: e.target.value
      }
      await groceriesUpdate(grocery, editExpire)
      loadGroceries(orderByName, orderByType)
    } catch (error) {
      console.log(error);
    }
  }

  const loadGroceries = async (orderByName, orderByType) => {
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
        setGroceriesData(_.orderBy(groceries, orderByName, orderByType))
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      <TableStyle>
        <thead>
          <tr>
            <th>Move</th>
            <th>
              <span className='title-names'>
                Name
                <span className={activeClass('name', 'asc')}><NavLink to='?orderByName=name&orderByType=asc'><KeyboardArrowUpSharp sx={{ fontSize: 18 }} /></NavLink></span>
                <span className={activeClass('name', 'desc')}><NavLink to='?orderByName=name&orderByType=desc'><KeyboardArrowDownSharp sx={{ fontSize: 18 }} /></NavLink></span>
              </span>
            </th>
            <th>
              <span className='title-names'>
                Enter
                <span className={activeClass('enter', 'asc')}><NavLink to='?orderByName=enter&orderByType=asc'><KeyboardArrowUpSharp sx={{ fontSize: 18 }} /></NavLink></span>
                <span className={activeClass('enter', 'desc')}><NavLink to='?orderByName=enter&orderByType=desc'><KeyboardArrowDownSharp sx={{ fontSize: 18 }} /></NavLink></span>
              </span>
            </th>
            <th>
              <span className='title-names'>
                Expire
                <span className={activeClass('expire', 'asc')}><NavLink to='?orderByName=expire&orderByType=asc'><KeyboardArrowUpSharp sx={{ fontSize: 18 }} /></NavLink></span>
                <span className={activeClass('expire', 'desc')}><NavLink to='?orderByName=expire&orderByType=desc'><KeyboardArrowDownSharp sx={{ fontSize: 18 }} /></NavLink></span>
              </span>
            </th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {
            _data.currentData().map((grocery) => {
              return (
                <tr key={grocery.key}>
                  <td>
                    <input type='checkbox'
                      checked={grocery.hasItem}
                      onChange={(e) => onChecked(e, grocery)}
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
                    <DeleteBtn
                      onClick={() => groceriesDelete(grocery.key)}
                    ><span><RemoveCircleOutline /></span></DeleteBtn>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </TableStyle>
    </>
  )
}

export default GroceriesTable