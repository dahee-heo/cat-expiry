import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavStyle = styled(NavLink)`
  margin-right: 20px;
  border-style: none;
  &.active {
    color: red;
  }
`

const Header = () => {
  return (
    <header>
      <div>Logo</div>
      <div>
        <NavStyle to='/home'>Home</NavStyle>
        <NavStyle to='/groceries'>Groceries</NavStyle>
        <NavStyle to='/items'>Item</NavStyle>

      </div>
    </header>
  )
}

export default Header