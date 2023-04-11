import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button';
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import { getProduct, patchProducts } from '../service/products.service';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from './Error.page';
import axios from 'axios';
import { Loading } from './Loading';
import { getBookmarks } from '../service/bookmarks.service';

export const Edit = ({ uid }) => {
  const [searchList, setSearchList] = useState([])
  const [listClick, setListClick] = useState(false)
  const [inputData, setInputData] = useState({
    category: "",
    name: "",
    enter: null,
    expire: null,
  })
  const [keyword, setKeyword] = useState("")
  const queryClient = useQueryClient()
  const { key } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = {key, uid}

  const { isLoading, isError, data: product, error, isFetching } = useQuery(
    ['product'], 
    (() => getProduct(params)), {
      cacheTime:100000,
      refetchOnMount: true,
      refetchOnWindowFocus:false,
      retry: 3, 
    },
  )

  const mutation = useMutation(
    (registData) => patchProducts(registData), 
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(['product']);
        navigate('/products')
      },
    },
  )

  useEffect(()=>{
    setInputData({
      category: product?.category,
      name: product?.name,
      enter: product?.enter,
      expire: product?.expire,
    })
    setKeyword(product?.name)
  }, [product])

  const handleInputChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setInputData((prevState) => ({
      ...prevState,
      name: e.target.value,
    }))
  }

  const { data } = useQuery(
    ['bookmarks'], 
    () => getBookmarks(uid), {
      refetchOnWindowFocus: false,
      retry: 3, 
    },
  )

  const searchResult = () => {
    let result = data.filter((list) => {
      return list.name.includes(keyword) === true
    })
    setSearchList(result)
  } 

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(keyword) searchResult()
    }, 200)
    return () => {
      clearTimeout(debounce)
    }
  }, [keyword])

  if (isLoading || isFetching) return <Loading />;

  const handleEdit = () => {
    const registData = {inputData, uid, key}
    mutation.mutate(registData)
  }

  // if ( Object.keys(props).lengh === 0 ) return <Error />
if (inputData) {
  return (
    <main className='regist'>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <h2>
          {t("modification")}
        </h2>
        <div className='select-box'>
          <label htmlFor="cartegory">{t("category")}</label>
          <select name="category" style={{width: "100%"}} id="category" 
            onChange={handleInputChange}
            value={inputData.category}
          >
            <option value="dry">{t("dry")}</option>
            <option value="wet">{t("wet")}</option>
            <option value="snack">{t("snack")}</option>
            <option value="nutrition">{t("nutrition")}</option>
          </select>
        </div>
        <div className='input-name'>
          <label htmlFor="name">{t("name")}</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={inputData.name}
            placeholder={`${t("regist.namePlaceholder")}`}
            onChange={handleKeywordChange}
          />
          { searchList.length > 0 && keyword && (
            <div className='auto-search'>
              <div className='auto-search__wrap'>
                <ul>
                  { searchList?.map((list) => {
                    return (
                      <li 
                        key={list.key}
                        onClick={()=>{
                          setInputData((prevState) => ({
                            ...prevState,
                            name: list.name,
                          }));
                          setSearchList([]);
                        }}
                      >{list.name}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ) }
        </div>
        <div>
          <label htmlFor="enter">{t("registrationDate")}</label>
          <input
            type='date'
            name="enter"
            disabled
            value={inputData.enter}
          />
        </div>
        <div>
          <label htmlFor="expire">{t("expiration")}</label>
          <input
            type='date'
            name="expire"
            onChange={handleInputChange}
            value={inputData.expire}
          />
        </div>
        <div className='btn-wrap'>
          <Button 
            width="49%" 
            type="secondary mr4" 
            text={`${t("cancel")}`}
            onClick={() => { navigate(-1) }}
          />
          <Button 
            width="49%" 
            type="primary" 
            text={`${t("modify")}`}
            onClick={handleEdit}
          />
        </div>
      </form>
    </main>
  )
}
}
