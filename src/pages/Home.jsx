import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { getGroceries } from '../states/groceriesState'

const Home = () => {
  const Main = styled.main`
    display: flex;
    height: 360px;
    font-size: 16px;
  `
  const MainVidual = styled.div`
    width: 100%;
    height: 400px;
    border-radius: 10px;
    background-color: #F4F4F4;

    & > .text-area{
      display: flex;
      flex-direction: column;
      padding-left: 40px;
      
      &  h2{
        font-size: 2rem;
      }

      & button {
        height: 44px;
        width: 200px;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 700;
        color: white;
        border: none;
      }
      & button:first-child {
        margin-right: 10px;
        background-color: #E10000;
      }
      & button:last-child {
        margin-right: 10px;
        background-color: #DD0000;
      }

      & a {
        text-decoration: none;
        color: white;
      }
    }

  `


  return (
    <Main>
      <MainVidual>
        <div className='text-area'>
          <div>
            <h2>
              고양이 식료품 <br />유통기한 관리 <br />
              <span>Cat-expiry</span>
            </h2>
          </div>
          <div>
            <button><Link to="/groceries">식료품 등록</Link></button>
            <button><Link to="/items">유통기한 체크</Link></button>
          </div>
        </div>

      </MainVidual>
    </Main>
  )
}

export default Home