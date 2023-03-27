import React from 'react'

export const Card = () => {
  return (
    <>
      <div className='card mr8'>
        <div className='card__wrap'>
          <div className='card__txt mb12'>
            <p>영양제</p>
            <h3>오메가3</h3>
          </div>
          <div className='card__con'>
            <p>D-1</p>
            <div className='progress'>
            <progress value="80" max="100"></progress>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}
