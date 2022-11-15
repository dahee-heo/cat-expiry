import React from 'react'
import { Link } from 'react-router-dom'
import { Main, MainVidual, } from '../components/styled.js'

const Home = () => {

  return (
    <Main>
      <MainVidual>
        <div className='text-area'>
          <div>
            <h2>
              고양이 식료품 <br />
              유통기한 관리 <br />
              <span>Cat-expiry</span>
            </h2>
          </div>
          <div>
            <button><Link to="/groceries">식료품 등록</Link></button>
            <button><Link to="/items">유통기한 체크</Link></button>
          </div>
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + '/main-visual.gif'} />
        </div>
      </MainVidual>
    </Main>
  )
}

export default Home