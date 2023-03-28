import React from 'react'
import { SearchOutlined } from '@material-ui/icons'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { BookmarkList } from '../components/BookmarkList';
import { useTranslation } from "react-i18next";


export const Bookmark = () => {
  const { t } = useTranslation();

  return (
    <main className="bookmark">
      <form className='mt20'>
        <input
          type="text"
          name='name'
          placeholder={`${t("bookmark.placeholder")}`}
        />
        <button className='search-icon'><CreateRoundedIcon/> </button>
      </form>
      <div>
        <div className='section__des mt20'>
          <div>
            <h2 className='title'>{t("bookmark.title")}</h2>
            <p className='sub'>{t("bookmark.description")}</p>
          </div>
        </div>
        <div className='list-wrap mt40'>
          <BookmarkList/>
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
