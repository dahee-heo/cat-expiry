import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div>Logo</div>
      <div>
        <NavLink to='home' activeClassName='active'>Home</NavLink>
        <NavLink to='groceries' activeClassName='active'>Groceries</NavLink>
        <NavLink to='items' activeClassName='active'>Item</NavLink>

      </div>
    </header>
  )
}

export default Header