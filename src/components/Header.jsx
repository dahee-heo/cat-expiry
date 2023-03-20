import React, { useEffect, useState } from 'react'
import { AccoutDiv, HeaderDiv, NavStyle } from './styled'
import { ReactComponent as Logo } from '../assets/Logo.svg'
import { styled } from '../styles/stitches.config';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRecoilState, useRecoilValue } from 'recoil';
import { users } from '../states/userState';
import { countSelector } from '../states/itemsState';
import { googleLogin, googleLogout, guestLogin } from '../service/login.service';
import { authService } from '../firebase';
import { useNavigate } from 'react-router-dom';

const MenuIcon = styled({
  width: "30px",
  height: "21px",
  position: "relative",
  cursor: "pointer",
  display: "inline-block",
  transition: ".4s cubic- bezier(.8, .5, .2, 1.4)",
  span: {
    backgroundColor: "$black",
    position: "absolute",
    borderRadius: "2px",
    width: "100%",
    height: "3px",
    "&:nth-child(1)": {
      top: "0px",
      right: "0px",
    },
    "&:nth-child(2)": {
      width: "24px",
      top: "9px",
      right: "0px",
    },
    "&:nth-child(3)": {
      bottom: "0px",
      right: "0px",
    },
  },
  "&:hover": {
    transition: ".5s cubic- bezier(.8, .5, .2, 1.4)",
    "span:nth-child(1)": {
      transform: "scaleX(.8)",
    },
    "span:nth-child(2)": {
      width: "100%",
      transform: "scaleX(.8)",
    },
    "span:nth-child(3)": {
      transform: "scaleX(.8)",
    },
  }

})

export const Header = () => {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const [loginView, setLoginView] = useState(false)
  const expireCount = useRecoilValue(countSelector)
  const nav = useNavigate()

  useEffect(() => {
    onAuthStateChanged()
  }, [])


  const handleClick = e => {
    e.preventDefault();
    setLoginView(!loginView)
  }

  const onAuthStateChanged = () => {
    authService.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setLoginUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        })
      } else {
        setLoginUser({
          displayName: null,
          email: null,
          uid: null,
        })
        if (window.location.pathname !== '/home') {
          nav('/')
        }
      }
    })
  }


  return (
    <HeaderDiv>
      <Logo><img src={process.env.PUBLIC_URL + '/logo.png'} /></Logo>
      {/* <div>
        <NavStyle to='/home'>Home</NavStyle>
        <NavStyle to='/groceries'>Groceries</NavStyle>
        <NavStyle to='/items'>Item
          <div className='count'>
            <span>{expireCount}</span>
          </div>
        </NavStyle>
      </div> */}
      {/* <AccoutDiv>
        <div className='account-menu' onClick={handleClick}>
          <span><AccountCircleOutlinedIcon sx={{ fontSize: 24 }} /></span>
          <ul className={loginView ? ' active' : ''}>
            {loginUser.uid
              ? <>
                <li style={{ fontWeight: 800 }}>{loginUser.displayName || '게스트'}</li>
                <li onClick={() => googleLogout()}>Logout</li>
              </>
              : <>
                <li onClick={guestLogin}>Guest</li>
                <li onClick={googleLogin}>Login</li>
              </>
            }
          </ul>
        </div>
      </AccoutDiv> */}
      <MenuIcon>
        <div className='nav-icon'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </MenuIcon>
    </HeaderDiv>
  )
}
