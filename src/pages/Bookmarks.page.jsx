import React, { useState } from 'react'
import { BookmarksTable } from '../components/BookmarksTable';
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getBookmarks, postBookmarks } from '../service/bookmarks.service';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';
import { Box, Pagination } from '@mui/material';
import usePagination from '../hook/usePagination';
import { format } from 'date-fns';
import { ErrorAlert } from '../components/ErrorAlert';

export const Bookmarks = ({ uid }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    enter: format(new Date(), 'yyyy-MM-dd'),
  })
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("enter");

  const { isLoading, isError, data, error } = useQuery(
    ['bookmarks', filter], 
    () => getBookmarks(uid, filter), {
      refetchOnWindowFocus: false,
      retry: 0, 
    }
  )

  const mutation = useMutation(
    (registData) => postBookmarks(registData), 
    {
      onSuccess: (data, variables, context) => {
      setInputData({name: ""})
      queryClient.invalidateQueries(['bookmarks']);
    },
  })

  

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

  const handleInputChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      name: e.target.value
    }))
  }

  const handleRegist = async () => {
    if (inputData.name.length === 0) {
      alert('한 글자 이상 입력해주세요.');
      return;
    }
    const registData = {inputData, uid}
    mutation.mutate(registData)
    setInputData("")
  }

  
  return (
    <main className="bookmark">
      <form className='mt20' onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name='name'
          placeholder={`${t("bookmark.placeholder")}`}
          onChange={handleInputChange}
          value={inputData.name}
        />
        <button className='write-icon' onClick={handleRegist}>
          <span></span>
        </button>
      </form>
      <div>
        <div className='section__des mt20'>
          <div>
            <h2 className='title'>{t("bookmark.title")}</h2>
            <p className='sub'>{t("bookmark.description")}</p>
          </div>
        </div>
        <div className='list-wrap mt40'>
          <BookmarksTable 
            data={pageData}
            // handleDelete={handleDelete}
            uid={uid}
            filter={filter}
            setFilter={setFilter}
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
