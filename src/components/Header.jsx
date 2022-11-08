import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { AccoutDiv, HeaderDiv, NavStyle } from './styled'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Header = () => {
  return (
    <HeaderDiv>
      <div>Logo</div>
      <div>
        <NavStyle to='/home'>Home</NavStyle>
        <NavStyle to='/groceries'>Groceries</NavStyle>
        <NavStyle to='/items'>Item</NavStyle>
      </div>
      <AccoutDiv>
        <div className='account-menu'>
          <sapn><AccountCircleOutlinedIcon sx={{ fontSize: 24 }} /></sapn>
          <ul>
            <li style={{ fontWeight: 800 }}>dahee heo</li>
            <li>Logout</li>
            <li>Guest</li>
            <li>Login</li>
          </ul>
        </div>
      </AccoutDiv>
    </HeaderDiv>
  )
}

export default Header