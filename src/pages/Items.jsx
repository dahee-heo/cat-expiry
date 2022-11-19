import React, { useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import { FormStyle, MainStyle } from '../components/styled.js'
import usePagination from '../service/pagination.service'
import { Pagination } from '@mui/material'
import { Box } from '@mui/system'
import ItemsTable from '../components/ItemsTable'

const Items = ({ uid }) => {
  const [inputText, setInputText] = useState('')
  const [itemsData, setItemsData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)

  const listNum = 10;
  const count = Math.ceil(itemsData.length / listNum)
  const _data = usePagination(itemsData, listNum)

  const handlePagination = (e, p) => {
    setPage(p);
    _data.jump(p)
  }

  const onChange = (event) => {
    setInputText(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchText(inputText)
  }

  return (
    <MainStyle>
      <FormStyle onSubmit={onSubmit}>
        <input
          type="text"
          name='name'
          placeholder='검색어를 입력해주세요.'
          value={inputText}
          onChange={onChange}
        />
        <button><SearchOutlined /></button>
      </FormStyle>

      <div>
        <ItemsTable
          _data={_data}
          uid={uid}
          searchText={searchText}
          itemsData={itemsData}
          setItemsData={setItemsData}
        />
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