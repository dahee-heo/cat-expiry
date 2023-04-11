import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@material-ui/icons';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { patchBookmarks } from '../service/bookmarks.service';

export const BookmarksTableList = ({uid, bookmark, handleDelete, checked}) => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [clickKey, setClickKey] = useState(null)
  const [inputData, setInputData] = useState({
    name: bookmark.name,
    enter: bookmark.enter,
  });
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (registData) => patchBookmarks(registData), 
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(['bookmarks']);
      },
    },
  )

  const handleInputChange = (event) => {
    setInputData((prevState)=>{
      return {
        ...prevState,
        name: event.target.value,
      }
    })
  }

  const handleEdit = (key) => {
    setClickKey(key)
    if (!edit) {
      setEdit(true)
    } else {
      const registData = {inputData, uid, key: bookmark.key}
      mutation.mutate(registData)
      navigate('/bookmarks')
      setEdit(false)
    }
  }
  
  
  return (
    <>
      <div className='list'>
        <div className='list__info'>
          <input 
            type="checkbox"
            onChange={()=>checked(bookmark.key)} 
          />
          
          { edit && clickKey === bookmark.key
            ? <input 
                type="text" 
                className='edit-input'
                value={inputData.name}
                onChange={handleInputChange}
              /> 
            : <h3 className='item-name ml8 mb4'>{bookmark.name}</h3>
          }
        </div>
        <div className='list__btn'>
          <Button 
            type="secondary" 
            text={`${t("modification")}`}
            onClick={() => handleEdit(bookmark.key)}
          />
          {edit && clickKey === bookmark.key
          ? <Button 
              type="secondary" 
              text={`${t("cancel")}`}
              onClick={() => setEdit(false)}
            />
          : <Button
            type="secondary" 
            text={`${t("delete")}`}
            onClick={() => handleDelete([bookmark.key])}
          /> }
        </div>
      </div>
    </>
  )
}
