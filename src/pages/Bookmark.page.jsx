import React from 'react'
import { SearchOutlined } from '@material-ui/icons'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { BookmarkList } from '../components/BookmarkList'

export const Bookmark = () => {
  return (
    <main className="bookmark">
      <form className='mt20'>
        <input
          type="text"
          name='name'
          placeholder='자주쓰는 메뉴를 추가해주세요.'
        />
        <button className='search-icon'><CreateRoundedIcon/> </button>
      </form>
      <div>
        <div className='section__des mt20'>
          <div>
            <h2 className='title'>Bookmark</h2>
            <p className='sub'>자주 쓰는 메뉴들을 관리해보세요.</p>
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
