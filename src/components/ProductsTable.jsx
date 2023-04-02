import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from 'react-router-dom';
import { itemsRead } from '../service/items.service';
import { ProductsTableList } from './ProductsTableList';

export const ProductsTable = ({ uid, data, searchText, onDelete }) => {
  const { t } = useTranslation();
  const home = true;
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams('')
  const tableFilter = searchParams.get('filter');
  const selectRef = useRef();
  const [itemsData, setItemsData] = useState([])

  const activeClass = (params) => {
    if (filter === params) {
      return " active";
    } else {
      return "";
    }
  }

  const sort = (event) => {
    data.sort(compare(event.target.value));
  }

  const compare = (key) => (a, b) => {
    return a[key] > a[key] ? 1 : a[key] < b[key] ? -1 : 0;
  };

  const tabContents = () => {
    const result = data.filter((ele) => {
      const date = new Date(ele.expire)
      const now = Date.now()
      return now - date < 30 * 30 * 24 * 3
    })

    if (result) setItems(result)
    console.log('result: ', result);
  }


  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   if (uid) { await loadItems() }
  // }

  // const deleteItems = async (grocery) => {
  //   await itemsDelete(grocery, uid)
  //   if (uid) { await loadItems() }
  // }



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
          <li 
            className={activeClass('finished')}
            onClick={()=>setFilter('finished')}
          ><NavLink to='?filter=finished'>{t("finished")}</NavLink></li>
        </ul>
        {
          window.location.pathname === '/' 
          ? <div className='all-view'>{t("viewAll")}</div>
          : <div>
              <select onChange={sort} ref={selectRef} defaultValue="enter" name="" id="">
                <option value="name">{t("sortAlphabet")}</option>
                <option value="enter">{t("sortRegistration")}</option>
                <option value="expire">{t("sortExpiration")}</option>
              </select>
            </div>
        }
        
      </div>
      { data 
        ? <div>
            {data.map(product => {
              return (
                <ProductsTableList 
                  items={product}
                  onDelete={onDelete}
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
