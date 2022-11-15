import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { itemsState } from '../states/itemsState'
import { itemsRead, itemsDelete, itemsUpdate } from '../service/items.service'
import { DeleteBtn, FormStyle, MainStyle, TableStyle, EditBtn } from '../components/styled.js'
import { KeyboardArrowDownSharp, KeyboardArrowUpSharp, RemoveCircleOutline } from '@mui/icons-material'
import { NavLink, useSearchParams } from 'react-router-dom'
import _ from 'lodash'
import usePagination from '../service/pagination.service'
import { Pagination } from '@mui/material'
import { Box } from '@mui/system'
import { users } from '../states/userState'

const Items = () => {

  const [itemsData, setItemsData] = useRecoilState(itemsState)
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [loginUser, setLoginUser] = useRecoilState(users)

  const uid = loginUser.uid

  const [searchParams, setSearchParams] = useSearchParams()

  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';

  const listNum = 10;
  const count = Math.ceil(itemsData.length / listNum)
  const _data = usePagination(itemsData, listNum)

  useEffect(() => {
    console.log('orderByName: ', orderByName);
    console.log('orderByType: ', orderByType);

  }, [orderByName, orderByType])


  useEffect(() => {
    if (uid) {
      loadItems(orderByName, orderByType)
    }
  }, [itemsData, orderByName, orderByType, uid])


  const loadItems = async (orderByName, orderByType) => {
    try {
      const response = await itemsRead()
      const itemsList = [];
      for (const key in response.data) {
        const item = response.data[key]
        if (item.name.indexOf(searchText) === -1) continue;
        item.key = key
        itemsList.push(item)
      }
      setItemsData(_.orderBy(itemsList, orderByName, orderByType))
    } catch (error) {
      console.log(error)
    }
  }

  const activeClass = function (_orderByName, _orderByType) {
    if (orderByName === _orderByName && orderByType === _orderByType) {
      return ' active';
    } else {
      return '';
    }
  }

  const handlePagination = (e, p) => {
    setPage(p);
    _data.jump(p)
  }



  return (
    <MainStyle>
      <FormStyle onSubmit={event => {
        event.preventDefault();
      }}>
        <input type="text" name='name' placeholder='검색어를 입력해주세요.' onChange={e => setSearchText(e.target.value)} />
        <button><SearchOutlined /></button>
      </FormStyle>

      <div>
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
      </div>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        sx={{ margin: "20px 0px" }}>
        <Pagination
          count={count}
          page={page}
          shape="rounded"
          onChange={handlePagination}
        ></Pagination>
      </Box>
    </MainStyle>
  )
}

export default Items