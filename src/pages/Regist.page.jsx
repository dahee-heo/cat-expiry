import React from 'react'
import { Modal, Box, Select, MenuItem } from '@mui/material'
import { Button } from '../components/Button';

export const Regist = ({open, handleClose}) => {

  return (
    <main className='regist'>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <h2>
          등록
        </h2>
        <div className='select-box'>
          <label htmlFor="cartegory">카테고리</label>
          <select name="" style={{width: "100%"}} id="category">
            <option value="dry">건식사료</option>
            <option value="wet">습식사료</option>
            <option value="snack">간식</option>
            <option value="nutrition">영양제</option>
          </select>
          {/* <div className='label'>카테고리</div> */}
          {/* <Select
            fullWidth
            defaultValue="dry"
            size="small"
          >
            <MenuItem value="dry">건식사료</MenuItem>
            <MenuItem value="wet">습식사료</MenuItem>
            <MenuItem value="snack">간식</MenuItem>
            <MenuItem value="nutrition">영양제</MenuItem>
          </Select> */}
        </div>
        <div>
          <label htmlFor="name">제품명</label>
          <input type="text" name="" id="name" placeholder='제품명을 입력해주세요.'/>
        </div>
        <div>
          <label htmlFor="enter">등록일</label>
          <input
            type='date'
            // defaultValue={grocery.expire}
            // onChange={(e) => {
            //   editExpire(grocery, e)
            // }
            // }
          />
        </div>
        <div>
          <label htmlFor="expire">유통기한 만료일</label>
          <input
            type='date'
            // defaultValue={grocery.expire}
            // onChange={(e) => {
            //   editExpire(grocery, e)
            // }
            // }
          />
        </div>
        <div className='btn-wrap'>
          <Button width="49%" type="secondary mr4" text="취소"/>
          <Button width="49%" type="primary" text="등록하기"/>
        </div>
      </form>
    </main>
  )
}
