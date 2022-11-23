import React, { useEffect, useState } from 'react'
import { add, format } from 'date-fns'
import { groceriesCreate, groceriesDelete, groceriesRead, groceriesUpdate } from '../service/groceries.service'
import { FormStyle, MainStyle } from '../components/styled.js'
import { EditSharp } from '@mui/icons-material'
import { Box, Pagination } from '@mui/material'
import usePagination from '../service/pagination.service'
import GroceriesTable from '../components/GroceriesTable'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'
import { itemsRead } from '../service/items.service'

const Groceries = ({ uid }) => {
  const [inputGrocery, setInputGrocery] = useState('')
  const [grocereisData, setGroceriesData] = useState([])
  const [page, setPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams('')
  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';

  const listNum = 10;
  const data = usePagination(grocereisData, listNum)

  const handlePagination = (e, p) => {
    setPage(p);
    data.jump(p)
  }


  useEffect(() => {
    if (uid) {
      loadGroceries(orderByName, orderByType)
    }
  }, [orderByName, orderByType, uid])


  const onInputChange = (event) => {
    setInputGrocery(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const postObj = {
      name: inputGrocery,
      enter: format(new Date(), 'yyyy-MM-dd'),
      expire: format(add(new Date(), { months: 2 }), 'yyyy-MM-dd'),
    }

    await groceriesCreate(postObj, uid);
    setInputGrocery('');
    if (uid) {
      await loadGroceries(orderByName, orderByType)
    }
  }

  const loadGroceries = async (orderByName, orderByType) => {
    const promises = [];

    promises[0] = new Promise(function (resolve, reject) {
      groceriesRead(uid).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
    promises[1] = new Promise(function (resolve, reject) {
      itemsRead(uid).then((response) => {
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
      await groceriesUpdate(grocery, editExpire, uid)
      if (uid) {
        await loadGroceries(orderByName, orderByType)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteGroceries = async (grcery) => {
    await groceriesDelete(grcery, uid)
    if (uid) {
      await loadGroceries(orderByName, orderByType)
    }
  }




  return (
    <MainStyle>
      <FormStyle onSubmit={onSubmit}>
        <input
          name='name'
          type="text"
          placeholder='식료품을 추가해주세요.'
          value={inputGrocery}
          onChange={onInputChange}
        />
        <button><EditSharp /></button>
      </FormStyle>

      <div>
        <GroceriesTable
          uid={uid}
          data={data}
          orderByName={orderByName}
          orderByType={orderByType}
          editExpire={editExpire}
          deleteGroceries={deleteGroceries}
        />
      </div>

      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        sx={{ margin: "20px 0px" }}>
        <Pagination
          count={data.maxPage}
          page={page}
          shape="rounded"
          onChange={handlePagination}
        ></Pagination>
      </Box>
    </MainStyle >
  )
}

export default Groceries