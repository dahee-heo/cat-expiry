import React, { useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import usePagination from '../service/pagination.service'
import { Modal, Pagination, Box } from '@mui/material'
import { useEffect } from 'react'
import { itemsDelete, itemsRead } from '../service/items.service.js'
import _ from 'lodash'
import { useSearchParams } from 'react-router-dom'
import { GroceryList } from '../components/GroceryList.jsx'
import { Button } from '../components/Button'
import { useTranslation } from "react-i18next";

const Items = ({ uid }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';
  const listNum = 10;
  const [itemsData, setItemsData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const data = usePagination(itemsData, listNum)
  const { t } = useTranslation();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    console.log('open: ', open);
    
  }, [open])

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
    <main className='items'>
      <form className='mt20' onSubmit={onSubmit}>
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
          <GroceryList/>
        </div>
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
    </main>
  )
}

export default Items