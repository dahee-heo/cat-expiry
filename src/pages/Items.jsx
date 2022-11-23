import React, { useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import { FormStyle, MainStyle } from '../components/styled.js'
import usePagination from '../service/pagination.service'
import { Pagination } from '@mui/material'
import { Box } from '@mui/system'
import ItemsTable from '../components/ItemsTable'
import { useEffect } from 'react'
import { itemsDelete, itemsRead } from '../service/items.service.js'
import _ from 'lodash'
import { useSearchParams } from 'react-router-dom'

const Items = ({ uid }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';
  const listNum = 10;
  const [itemsData, setItemsData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const data = usePagination(itemsData, listNum)


  useEffect(() => {
    if (uid) {
      loadItems(orderByName, orderByType)
    }
  }, [orderByName, orderByType, uid])


  const loadItems = async (orderByName, orderByType) => {
    try {
      const response = await itemsRead(uid)
      const itemsList = [];
      for (const key in response.data) {
        const item = response.data[key]
        if (!item.name.includes(searchText)) continue;
        item.key = key
        itemsList.push(item)
      }
      setItemsData(_.orderBy(itemsList, orderByName, orderByType))
    } catch (error) {
      console.log(error)
    }
  }

  const handlePagination = (e, p) => {
    setPage(p);
    data.jump(p)
  }

  const onChange = (event) => {
    setSearchText(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (uid) { await loadItems(orderByName, orderByType) }
  }

  const deleteItems = async (grocery) => {
    await itemsDelete(grocery, uid)
    if (uid) { await loadItems(orderByName, orderByType) }
  }


  return (
    <MainStyle>
      <FormStyle onSubmit={onSubmit}>
        <input
          type="text"
          name='name'
          placeholder='검색어를 입력해주세요.'
          value={searchText}
          onChange={onChange}
        />
        <button><SearchOutlined /></button>
      </FormStyle>

      <div>
        <ItemsTable
          data={data}
          searchText={searchText}
          orderByName={orderByName}
          orderByType={orderByType}
          deleteItems={deleteItems}
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
    </MainStyle>
  )
}

export default Items