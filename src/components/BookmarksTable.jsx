import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from 'react-router-dom';
import { patchBookmarks } from '../service/bookmarks.service';
import { BookmarksTableList } from './BookmarksTableList';

export const BookmarksTable = ({ data, handleDelete, uid }) => {
  const [sortType, setSortType] = useState("registration");
  const [searchParams, setSearchParams] = useSearchParams('')
  // const tableFilter = searchParams.get('filter');
  const { t } = useTranslation();

  const activeClass = (params) => {
    if (sortType === params) {
      return " active";
    } else {
      return "";
    }
  }

  //선택 삭제
  const checkedArray = [];
  const checked = (key) => {
    if (!checkedArray.includes(key)) {
      checkedArray.push(key)
    }
  }

  const compare = (type) => (a, b) => {
    const key = type === "registration" ? "enter" : "name"
    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;

  };

  //탭 필터, 셀렉트 값 정렬
  const filteredData = data?.sort(compare(sortType))

  return (
    <>
      <div className='table-header'>
        <ul className='tab-menu'>
        <li 
            className={activeClass('registration')}
            onClick={()=>setSortType('registration')}
          ><NavLink to='?filter=registration'>{t("sortRegistration")}</NavLink></li>
          <li 
            className={activeClass('alphabet')}
            onClick={()=>setSortType('alphabet')}
          ><NavLink to='?filter=alphabet'>{t("sortAlphabet")}</NavLink></li>
        </ul>
        <div className='check-del'>
          <Button 
            type="primary"
            text={`${t("selectionDelete")}`}
            onClick={() => handleDelete(checkedArray)}
          />
        </div>
      </div>
      { data 
        ? <div>
            {
              filteredData?.map(bookmark => {
                return (
                  <BookmarksTableList 
                    bookmark={bookmark} 
                    uid={uid}
                    handleDelete={handleDelete}
                    checked={checked}
                  />
                )
              })
            }
          </div>
        : <div className='no-regist'>
            <p>
              등록된 제품이 없습니다.
              아래 버튼을 클릭하여 추가해주세요.
            </p>
          </div>
      }
    </>
  )
}
