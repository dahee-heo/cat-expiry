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
            <h2 className='title mb4'>{t("dday.title")}</h2>
            <p className='sub'>{t("dday.description")}</p>
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
            <h2 className='title'>{t("now.title")}</h2>
            <p className='sub'>{t("now.description")}</p>
          </div>
        </div>
        <div className='sction__contents'>
          <div className='item-wrap'>
            <ul>
              <li>
                <p>2</p>
                <p>{t("dry")}</p>
              </li>
              <li>
                <p>10</p>
                <p>{t("wet")}</p>
              </li>
              <li>
                <p>0</p>
                <p>{t("snack")}</p>
              </li>
              <li>
                <p>2</p>
                <p>{t("nutrition")}</p>
              </li>
            </ul>
          </div>
          <div className='list-wrap mt40'>
            <GroceryList/>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home