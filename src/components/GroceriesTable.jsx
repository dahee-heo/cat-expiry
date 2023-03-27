import React, { useEffect } from 'react'
import { itemsDelete, itemsUpdate } from '../service/items.service'
import { KeyboardArrowDownSharp, KeyboardArrowUpSharp, RemoveCircleOutline } from '@mui/icons-material'
import { NavLink, useSearchParams } from 'react-router-dom'
import _ from 'lodash'


const GroceriesTable = ({ uid, editExpire, data, orderByName, orderByType, deleteGroceries }) => {

  const onChecked = async (e, grocery) => {
    if (e.target.checked) {
      itemsUpdate(grocery, uid)
    } else {
      itemsDelete(grocery, uid)
    }
  }

  const activeClass = function (_orderByName, _orderByType) {
    if (orderByName === _orderByName && orderByType === _orderByType) {
      return ' active';
    } else {
      return '';
    }
  }


  return (
    <>
      <table>
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
            data.currentData().map((grocery) => {
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
                    <button
                      onClick={() => deleteGroceries(grocery.key)}
                    ><span><RemoveCircleOutline /></span></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default GroceriesTable