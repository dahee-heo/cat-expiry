import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from 'react-router-dom';
import { itemsRead } from '../service/items.service';
import { ProductsTableList } from './ProductsTableList';

export const ProductsTable = ({ uid, data, searchText, handleDelete }) => {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortType, setSoltType] = useState("enter")
  const [searchParams, setSearchParams] = useSearchParams('')
  const tableFilter = searchParams.get('filter');
  const selectRef = useRef();
  const { t } = useTranslation();

  const activeClass = (params) => {
    if (filterType === params) {
      return " active";
    } else {
      return "";
    }
  }

  const dataSort = (type) => {
    const sortedData = data?.sort(compare(type))
    return sortedData;
  }
  
  useEffect(()=>{
    dataSort(sortType)
  }, [sortType])

  const compare = (key) => (a, b) => {
    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
  };

  //탭 필터, 셀렉트 값 정렬
  const filteredData = data?.filter((ele) => {
    if (filterType === "all") return ele;
    if (filterType === "impending") { 
      const date = new Date(ele.expire)
      const now = Date.now()
      return date.getTime() - now < 1000 * 60 * 60 * 24 * 7
    }
  }).sort(compare(sortType))

  return (
    <>
      <div className='table-header'>
        <ul className='tab-menu'>
          <li 
            className={activeClass('all')}
            onClick={()=>setFilterType('all')}
          ><NavLink to='?filter=all'>{t("all")}</NavLink></li>
          <li 
            className={activeClass('impending')}
            onClick={()=>setFilterType('impending')}
          ><NavLink to='?filter=impending'>{t("impending")}</NavLink></li>
        </ul>
        <div>
          <select onChange={(e)=>{ setSoltType(e.target.value) }} ref={selectRef} defaultValue="enter" name="" id="">
            <option value="name">{t("sortAlphabet")}</option>
            <option value="enter">{t("sortRegistration")}</option>
            <option value="expire">{t("sortExpiration")}</option>
          </select>
        </div>
      </div>
      { data 
        ? <div>
            {filteredData?.map(product => {
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
