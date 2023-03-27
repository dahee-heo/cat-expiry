import React from 'react'
import { GroceryListItems } from './GroceryListItems'

export const GroceryList = () => {
  const home = true;

  return (
    <>
      <div className='table-header'>
        <ul className='tab-menu'>
          <li className='active'>전체</li>
          <li>만료 임박</li>
          <li>처리완료</li>
        </ul>
        {
          home 
          ? <div className='all-view'>전체보기</div>
          : <div>
              <select defaultValue="enter" name="" id="">
                <option value="name">가나다순</option>
                <option value="enter">등록일순</option>
                <option value="expire">만료일순</option>
              </select>
            </div>
        }
        
      </div>
      <div>
        <GroceryListItems/>
        <GroceryListItems/>
        <GroceryListItems/>
        <GroceryListItems/>
      </div>
      {/* <div className='no-regist'>
        <p>
          등록된 제품이 없습니다.
          아래 버튼을 클릭하여 추가해주세요.
        </p>
      </div> */}
    </>
  )
}
