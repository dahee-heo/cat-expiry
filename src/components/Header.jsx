import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { users } from '../states/userState';
import { countSelector } from '../states/itemsState';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { Sidebar } from './MypageModal';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@material-ui/icons';

const Header = () => {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const [loginView, setLoginView] = useState(false)
  const expireCount = useRecoilValue(countSelector)
  const [menuOpen, setMenuOpen] = useState(false)
  const handleOpen = () => setMenuOpen(true)
  const navigation = useNavigate()

  return (
    <>
      <div className='header'>
        <div className='header__wrap'>
          <h1><Logo/></h1>
          <div className='global'>
            <div className=''>
              <img src="" alt="" /> KOR <span></span></div>
            <ul className='slide'>
              <li><img src={'../assets/kor.png'} alt="" /> KOR</li>
              <li><img src="" alt="" /> ENG</li>
            </ul>
          </div>
        </div>
        </div>
    </>
  )
}

export default Header