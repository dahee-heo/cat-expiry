import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ReactComponent as BottomHome } from '../assets/bottom_home.svg';
import { ReactComponent as BottomRegist} from '../assets/bottom_regist.svg';
import { ReactComponent as BottomBookmark } from '../assets/bottom_bookmark.svg';
import { ReactComponent as BottomMy } from '../assets/bottom_my.svg';
import { ReactComponent as BottomFood } from '../assets/bottom_food.svg';
import { MypageModal } from './MypageModal';

export const BottomMenu = () => {
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='bottom-menu'>
      <MypageModal open={open} handleClose={handleClose}/>
      <div className='bottom-menu__wrap'>
        <div>
          <NavLink to="/">
            <BottomHome/>
            <p>Home</p>
          </NavLink>
        </div>
        <div>
          <NavLink to="/products">
            <BottomFood/>
            <p>Products</p>
          </NavLink>
        </div>
        <div>
          <NavLink to="/regist">
            <BottomRegist/>
            <p>Add</p>
          </NavLink>
        </div>
        <div>
          <NavLink to="/bookmark">
            <BottomBookmark/>
            <p>Bookmark</p>
          </NavLink>
        </div>
        <div>
          <NavLink onClick={handleOpen}>
            <BottomMy/>
            <p>My page</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
