import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from 'react-router-dom';
import { itemsRead } from '../service/items.service';
import { ProductsTableList } from './ProductsTableList';

export const ProductsTable = ({ data, handleDelete, filter, setFilter, setSortType }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  const tableFilter = searchParams.get('filter');
  const selectRef = useRef();
  const { t } = useTranslation();

  const activeClass = (params) => {
    if (filter === params) {
      return " active";
    } else {
      return "";
    }
  }

  return (
    <>
      <div className='table-header'>
        <ul className='tab-menu'>
          <li 
            className={activeClass('all')}
            onClick={()=>setFilter('all')}
          ><NavLink to='?filter=all'>{t("all")}</NavLink></li>
          <li 
            className={activeClass('impending')}
            onClick={()=>setFilter('impending')}
          ><NavLink to='?filter=impending'>{t("impending")}</NavLink></li>
        </ul>
        <div>
          <select onChange={(e)=>{ setSortType(e.target.value) }} ref={selectRef} defaultValue="enter" name="" id="">
            <option value="name">{t("sortAlphabet")}</option>
            <option value="enter">{t("sortRegistration")}</option>
            <option value="expire">{t("sortExpiration")}</option>
          </select>
        </div>
      </div>
      { data 
        ? <div>
            {data?.map(product => {
              return (
                <ProductsTableList 
                  data={product}
                  handleDelete={handleDelete}
                />
              )
            })}
          </div> 
        : <div className='no-regist'>
            <p>
              등록된 제품이 없습니다.
              아래 버튼을 클릭하여 추가해주세요.
            </p>
          </div> }
    </>
  )
}
