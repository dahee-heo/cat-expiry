import React, { useEffect, useState } from 'react'
import { AccoutDiv, HeaderDiv, Logo, NavStyle } from './styled'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import firebase from 'firebase/compat/app';
import { useRecoilState } from 'recoil';
import { users } from '../states/userState';
import { emailSignin, emailSignup, googleLogin, googleLogout } from '../service/login.service';
import { authService } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { countState } from '../states/itemsState';


const Header = () => {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const [loginView, setLoginView] = useState(false)
  const [count, setCount] = useRecoilState(countState)

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
      <div>
        <NavStyle to='/home'>Home</NavStyle>
        <NavStyle to='/groceries'>Groceries</NavStyle>
        <NavStyle to='/items'>Item<div className='count'><span>{count}</span></div></NavStyle>
      </div>
      <AccoutDiv>
        <div className='account-menu' onClick={handleClick}>
          <sapn><AccountCircleOutlinedIcon sx={{ fontSize: 24 }} /></sapn>
          <ul className={loginView ? ' active' : ''}>
            {loginUser.uid
              ? <>
                <li style={{ fontWeight: 800 }}>{loginUser.displayName || '게스트'}</li>
                <li onClick={() => googleLogout()}>Logout</li>
              </>
              : <>
                <li onClick={emailSignin}>Guest</li>
                <li onClick={googleLogin}>Login</li>
              </>
            }
          </ul>
        </div>
      </AccoutDiv>
    </HeaderDiv>
  )
}

export default Header