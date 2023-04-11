import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import { ProductsTable } from '../components/ProductsTable'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deleteProducts, getProducts } from '../service/products.service';
import { Loading } from './Loading';
import { Box, Pagination } from '@mui/material';
import usePagination from '../hook/usePagination';
import { ErrorAlert } from '../components/ErrorAlert';

export const Products = ({ uid }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const tableFilter = searchParams.get('filter');
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const [filter, setFilter] = useState("all");
  const [sortType, setSortType] = useState("enter")

  const { isLoading, isError, data, error } = useQuery(
    ['products', filter, sortType], 
    () =>  getProducts(uid, filter, sortType), 
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      enabled: true,
      initialData: () =>
      queryClient
      .getQueryData(['products']),
      select: data => data.filter(list => list.name.includes(searchText))
    }
  )
    
  const mutation = useMutation(
    (deleteData) => deleteProducts(deleteData), 
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(['products']);
      },
    },
  )

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleDelete = (key) => {
    const deleteData = {key, uid}
    mutation.mutate(deleteData)
  }

  //페이지네이션
  const listNum = 10;
  const _data = usePagination(data, listNum)
  const handlePagination = (e, p) => {
    setPage(p);
    _data.jump(p)
  }
  const pageData = _data.currentData()
  
  if (isLoading) { return <Loading />; }
  if (isError) { return <ErrorAlert error={error} />; }

  return (
    <main className='products'>
      <form className='mt20' onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name='name'
          placeholder={`${t("items.searchPlaceholder")}`}
          value={searchText}
          onChange={handleSearchChange}
        />
        <button className='search-icon'>
          <span></span>
        </button>
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
            data={pageData}
            searchText={searchText}
            handleDelete={handleDelete}
            filter={filter}
            setFilter={setFilter}
            setSortType={setSortType}
          />
    </div>
      </div>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        sx={{ margin: "20px 0px" }}>
        <Pagination
          count={_data.maxPage}
          page={page}
          shape="rounded"
          onChange={handlePagination}
        ></Pagination>
      </Box>
    </main>
  )
}
