import React from 'react'

export const Button = ({type, onClick, width, text}) => {
  return (
    <button 
      className={type} 
      onClick={onClick}
      style={{width: `${width}`}}
    >{text}</button>
  )
}
