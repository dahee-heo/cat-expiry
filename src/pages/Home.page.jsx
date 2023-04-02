import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { ProductsTable } from '../components/ProductsTable';
import { useQuery } from 'react-query';
import { getProducts } from '../service/products.service';
import { Loading } from './Loading';

const Home = ({ uid }) => {
  const { t } = useTranslation();
  const { isLoading, isError, data, error } = useQuery(['products'], () => getProducts(uid), {
    refetchOnWindowFocus: false,
    retry: 0, 
  })

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const dryCount = data.filter(ele => ele.category === "dry")
  const wetCount = data.filter(ele => ele.category === "wet")
  const snackCount = data.filter(ele => ele.category === "snack")
  const nutritionCount = data.filter(ele => ele.category === "nutrition")
  
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
              <li className={dryCount.length === 0 ? "zero" : ""}>
                <p>{dryCount.length}</p>
                <p>{t("dry")}</p>
              </li>
              <li className={wetCount.length === 0 ? "zero" : ""}>
                <p>{wetCount.length}</p>
                <p>{t("wet")}</p>
              </li>
              <li className={snackCount.length === 0 ? "zero" : ""}>
                <p>{snackCount.length}</p>
                <p>{t("snack")}</p>
              </li>
              <li className={nutritionCount.length === 0 ? "zero" : ""}>
                <p>{nutritionCount.length}</p>
                <p>{t("nutrition")}</p>
              </li>
            </ul>
          </div>
          <div className='list-wrap mt40'>
            <ProductsTable
              data={data} 
              uid={uid}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home