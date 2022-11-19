import React, { useState } from 'react'
import { add, format } from 'date-fns'
import { groceriesCreate } from '../service/groceries.service'
import { FormStyle, MainStyle } from '../components/styled.js'
import { EditSharp } from '@mui/icons-material'
import { Box, Pagination } from '@mui/material'
import usePagination from '../service/pagination.service'
import GroceriesTable from '../components/GroceriesTable'

const Groceries = ({ uid }) => {
  const [inputGrocery, setInputGrocery] = useState('')
  const [grocereisData, setGroceriesData] = useState([])
  const [page, setPage] = useState(1)

  const listNum = 10;
  const count = Math.ceil(grocereisData.length / listNum)
  const _data = usePagination(grocereisData, listNum)

  const handlePagination = (e, p) => {
    setPage(p);
    _data.jump(p)
  }

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

    await groceriesCreate(postObj);
    setInputGrocery('');
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
          grocereisData={grocereisData}
          setGroceriesData={setGroceriesData}
          _data={_data}
          uid={uid}
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
    </MainStyle >
  )
}

export default Groceries