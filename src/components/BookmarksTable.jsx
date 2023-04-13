import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { useTranslation } from "react-i18next";
import { NavLink, useSearchParams } from 'react-router-dom';
import { deleteBookmarks, patchBookmarks } from '../service/bookmarks.service';
import { BookmarksTableList } from './BookmarksTableList';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const BookmarksTable = ({ data, uid, filter, setFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams('')
  // const tableFilter = searchParams.get('filter');
  const { t } = useTranslation();
  const queryClient = useQueryClient()

  const activeClass = (params) => {
    if (filter === params) {
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

  const deleteBookmark = useMutation(
    (deleteData) => deleteBookmarks(deleteData), 
    {
      onSuccess: (data, variables, context) => {
        console.log('data: ', data);
        queryClient.invalidateQueries(['bookmarks']);
      },
    }
  )

  const handleDelete = (keyArray) => {
    const deleteData = {keyArray, uid}
    deleteBookmark.mutate(deleteData)
  }


  return (
    <>
      <div className='table-header'>
        <ul className='tab-menu'>
        <li 
            className={activeClass('enter')}
            onClick={()=>setFilter('enter')}
          ><NavLink to='?filter=enter'>{t("sortRegistration")}</NavLink></li>
          <li 
            className={activeClass('name')}
            onClick={()=>setFilter('name')}
          ><NavLink to='?filter=name'>{t("sortAlphabet")}</NavLink></li>
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
              data?.map(bookmark => {
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
