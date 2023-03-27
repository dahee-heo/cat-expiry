import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { GroceryList } from '../components/GroceryList';
import { RegistModal } from './Regist.page';

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  return (
    <main>
      <section className='mt40'>
        <div className='section__des mb20'>
          <div>
            <h2 className='title mb4'>D-day</h2>
            <p className='sub'>유통기한 임박한 제품이 있어요!</p>
          </div>
          <div>
            <p className='all-view'>전체보기</p>
          </div>
        </div>
        <div className='sction__contents'>
          <div className='card-list'>
            <div className='card-container'>
              <Card/>
              <Card/>
              <Card/>
            </div>
          </div>
        </div>
      </section>
      <section className='mt40'>
        <div className='section__des mb20'>
          <div>
            <h2 className='title'>Now</h2>
            <p className='sub'>지금 보관중인 제품을 확인해보세요.</p>
          </div>
        </div>
        <div className='sction__contents'>
          <div className='item-wrap'>
            <ul>
              <li>
                <p>2</p>
                <p>건식사료</p>
              </li>
              <li>
                <p>10</p>
                <p>습식사료</p>
              </li>
              <li>
                <p>0</p>
                <p>간식</p>
              </li>
              <li>
                <p>2</p>
                <p>영양제</p>
              </li>
            </ul>
          </div>
          <div className='list-wrap mt40'>
            <GroceryList/>
          </div>
        </div>
      </section>
      <div className='mt40'>
        <Button 
          width="100%" 
          type="primary" 
          onClick={handleOpen} 
          text="등록하기"
        />
      </div>
    </main>
  )
}

export default Home