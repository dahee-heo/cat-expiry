import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button';
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import { postProducts } from '../service/products.service';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getBookmarks } from '../service/bookmarks.service';

export const Regist = ({ uid }) => {
  const [inputData, setInputData] = useState({
    category: "dry",
    name: "",
    enter: format(new Date(), 'yyyy-MM-dd'),
    expire: null,
  })
  const [keyword, setKeyword] = useState("")
  const [searchList, setSearchList] = useState([])
  const [listClick, setListClick] = useState(false)
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef()

  const { isLoading, isError, data, error } = useQuery(
    ['bookmarks'], 
    () => getBookmarks(uid), {
      refetchOnWindowFocus: false,
      retry: 3, 
    },
  )
  
  const mutation = useMutation(
    (registData) => postProducts(registData)
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


  const handleInputChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setInputData((prevState) => ({
      ...prevState,
      name: e.target.value,
    }))
  }

  const handleRegist = () => {
    const registData = {inputData, uid}
    mutation.mutate(registData)
    navigate('/products')
  }

  return (
    <main className='regist'>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <h2>
          {t("registration")}
        </h2>
        <div className='select-box'>
          <label htmlFor="cartegory">{t("category")}</label>
          <select name="category" style={{width: "100%"}} id="category" onChange={handleInputChange}>
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
            placeholder={`${t("regist.namePlaceholder")}`}
            value={inputData.name}
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
            defaultValue={inputData.enter}
          />
        </div>
        <div>
          <label htmlFor="expire">{t("expiration")}</label>
          <input
            type='date'
            name="expire"
            onChange={handleInputChange}
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
            text={`${t("register")}`}
            onClick={handleRegist}
          />
        </div>
      </form>
    </main>
  )
}
