import React, { useEffect } from 'react'
import { KeyboardArrowDownSharp, KeyboardArrowUpSharp, RemoveCircleOutline } from '@mui/icons-material'
import { NavLink, useSearchParams } from 'react-router-dom'
import { DeleteBtn, TableStyle } from '../components/styled.js'
import _ from 'lodash'

const ItemsTable = ({ data, orderByName, orderByType, deleteItems }) => {

  const activeClass = function (name, type) {
    if (orderByName === name && orderByType === type) {
      return ' active';
    } else {
      return '';
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
            data.currentData().map((grocery, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{grocery.name}</td>
                  <td>{grocery.enter}</td>
                  <td>{grocery.expire}</td>
                  <td>
                    <DeleteBtn onClick={() => deleteItems(grocery)}><span><RemoveCircleOutline /></span></DeleteBtn>
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