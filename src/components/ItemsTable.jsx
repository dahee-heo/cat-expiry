import React, { useEffect } from 'react'
import { itemsRead, itemsDelete } from '../service/items.service'
import { KeyboardArrowDownSharp, KeyboardArrowUpSharp, RemoveCircleOutline } from '@mui/icons-material'
import { NavLink, useSearchParams } from 'react-router-dom'
import { DeleteBtn, TableStyle } from '../components/styled.js'
import _ from 'lodash'
import { add, format } from 'date-fns'
import { useRecoilState } from 'recoil'
import { countState } from '../states/itemsState'

const ItemsTable = ({ uid, _data, searchText, itemsData, setItemsData }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';
  const [count, setCount] = useRecoilState(countState)



  useEffect(() => {
    if (uid) {
      loadItems(orderByName, orderByType)
    }
  }, [orderByName, orderByType, uid])


  const activeClass = function (_orderByName, _orderByType) {
    if (orderByName === _orderByName && orderByType === _orderByType) {
      return ' active';
    } else {
      return '';
    }
  }

  const loadItems = async (orderByName, orderByType) => {
    try {
      const response = await itemsRead()
      const itemsList = [];
      for (const key in response.data) {
        const item = response.data[key]
        if (format(add(new Date(), { days: 3 }), 'yyyy-MM-dd') > item.expire) setCount(count => count++)
        if (item.name.indexOf(searchText) === -1) continue;
        item.key = key
        itemsList.push(item)
      }
      setItemsData(_.orderBy(itemsList, orderByName, orderByType))
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <TableStyle>
        <thead>
          <tr>
            <th>No</th>
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
            _data.currentData().map((grocery, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{grocery.name}</td>
                  <td>{grocery.enter}</td>
                  <td>{grocery.expire}</td>
                  <td>
                    <DeleteBtn onClick={() => itemsDelete(grocery)}><span><RemoveCircleOutline /></span></DeleteBtn>
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

export default ItemsTable