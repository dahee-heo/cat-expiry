import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@material-ui/icons'
import { ProductsTable } from '../components/ProductsTable'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from 'react-query';
import { deleteProducts, getProducts } from '../service/products.service';
import { Loading } from './Loading';

export const Products = ({ uid }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { isLoading, isError, data, error } = useQuery(['products'], () => getProducts(uid), {
    refetchOnWindowFocus: false,
    retry: 0, 
  })


  const mutation = useMutation((deleteData) => deleteProducts(deleteData), {
    onMutate: variable => {
      console.log("onMutate", variable);
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onError: (error, variable, context) => {
      console.log('error: ', error);
      // error
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
    onSettled: () => {
      console.log("end");
    }
  })

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const onChange = (event) => {
    setSearchText(event.target.value)
  }

  const onDelete = (key) => {
    const deleteData = {key, uid}
    console.log('deleteData: ', deleteData);
    mutation.mutate(deleteData)
    navigate('/products')
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
          {/* { data.map(ele=>{
            return ( */}
              <ProductsTable
                data={data}
                searchText={searchText}
                onDelete={onDelete}
              />
            {/* )
          }) } */}
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
