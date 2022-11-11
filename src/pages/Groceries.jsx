import React, { useEffect, useState } from 'react'
import { add, format } from 'date-fns'
import { useRecoilState } from 'recoil'
import { groceriesState } from '../states/groceriesState'
import { itemsState } from '../states/itemsState'
import { itemsDelete, itemsRead, itemsUpdate } from '../service/items.service'
import { groceriesCreate, groceriesDelete, groceriesRead, groceriesUpdate } from '../service/groceries.service'
import { DeleteBtn, FormStyle, MainStyle, TableStyle } from '../components/styled.js'
import { EditSharp, KeyboardArrowDownSharp, KeyboardArrowUpSharp, RemoveCircleOutline } from '@mui/icons-material'
import { Box, Pagination } from '@mui/material'
import usePagination from '../service/pagination.service'
import { NavLink, useSearchParams } from 'react-router-dom'
import _ from 'lodash'
import { users } from '../states/userState'

const Groceries = () => {

  const [grocereisData, setGroceriesData] = useRecoilState(groceriesState)
  const [itemsData, setItemsData] = useRecoilState(itemsState)
  const [page, setPage] = useState(1)
  const [loginUser, setLoginUser] = useRecoilState(users)

  const uid = loginUser.uid;

  const [searchParams, setSearchParams] = useSearchParams()

  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';

  const [inputData, setInputData] = useState({
    name: null,
    enter: format(new Date(), 'yyyy-MM-dd'),
    expire: format(add(new Date(), { months: 2 }), 'yyyy-MM-dd'),
    done: false,
  })

  const listNum = 10;
  const count = Math.ceil(grocereisData.length / listNum)
  const _data = usePagination(grocereisData, listNum)

  useEffect(() => {
    if (uid) {
      loadGroceries(orderByName, orderByType)
    }
  }, [grocereisData, orderByName, orderByType, uid])


  const handleInput = e => {
    setInputData({ ...inputData, name: e.target.value })
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



  const editExpire = async (grocery, e) => {
    try {
      const editExpire = {
        expire: e.target.value
      }
      await groceriesUpdate(grocery, editExpire)
      loadGroceries()
    } catch (error) {
      console.log(error);
    }
  }

  const onChange = async (e, grocery) => {
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

  const handlePagination = (e, p) => {
    setPage(p);
    _data.jump(p)
  }




  return (
    <MainStyle>
      <FormStyle onSubmit={event => {
        event.preventDefault();
      }}>
        <input type="text" placeholder='식료품을 추가해주세요.' name='name' onChange={(e) => handleInput(e)} />
        <button onClick={() => groceriesCreate(inputData)}><EditSharp /></button>
      </FormStyle>

      <div>
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
                        onChange={(e) => onChange(e, grocery)}
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
    </MainStyle >
  )
}

export default Groceries