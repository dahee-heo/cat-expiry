import React, { useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import usePagination from '../hook/usePagination'
import { Pagination, Box } from '@mui/material'
import { useEffect } from 'react'
import { itemsDelete, itemsRead } from '../service/items.service.js'
import _ from 'lodash'
import { useSearchParams } from 'react-router-dom'
import { ProductsTable } from '../components/ProductsTable.jsx'
import { useTranslation } from "react-i18next";

const Items = ({ uid }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const filter = searchParams.get('filter')
  const listNum = 10;
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  // const data = usePagination(itemsData, listNum)
  const { t } = useTranslation();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  // const handlePagination = (e, p) => {
  //   setPage(p);
  //   data.jump(p)
  // }

  const onChange = (event) => {
    setSearchText(event.target.value)
  }



  return (
    <main className='items'>
      <form className='mt20' onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name='name'
          placeholder={`${t("items.searchPlaceholder")}`}
          value={searchText}
          onChange={onChange}
        />
        <button className='search-icon'><SearchOutlined /></button>
      </form>
      <div>
        <div className='section__des mt20'>
          <div>
            <h2 className='title'>{t("now.title")}</h2>
            <p className='sub'>{t("now.description")}</p>
          </div>
        </div>
        <div className='list-wrap mt40'>
          <ProductsTable 
            // data={itemsData}
            searchText={searchText}
          />
        </div>
      </div>
      {/* <Box
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
      </Box> */}
    </main>
  )
}

export default Items