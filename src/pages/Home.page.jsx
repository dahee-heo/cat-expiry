import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { ProductsTable } from '../components/ProductsTable';
import { useQuery, useQueryClient } from 'react-query';
import { getProducts } from '../service/products.service';
import { Loading } from './Loading';
import { Error } from './Error.page';

const Home = ({ uid }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery(['products'], () => getProducts(uid), {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    cacheTime: 1000 * 30,
    isFetchedAfterMount: true,
    // initialData: () =>
    //   queryClient
    //     .getQueryData(['products'])
    // ?.find((list) => list.uid === uid),
    
  })
  
  if (isLoading) { return <Loading />; }
  if (isError) { return <Error />;
  }

  const dryCount = data.filter(ele => ele.category === "dry")
  const wetCount = data.filter(ele => ele.category === "wet")
  const snackCount = data.filter(ele => ele.category === "snack")
  const nutritionCount = data.filter(ele => ele.category === "nutrition")
  
  const compare = (key) => (a, b) => {
    return a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;
  };

  const dday = data.filter(ele => {
    const date = new Date(ele.expire)
    const now = Date.now();
    const diff = (date.getTime() - now) / 1000;
    return diff < 60 * 60 * 24 * 7;
  }).sort(compare("expire"))
  
  return (
    <main>
      <section className='mt40'>
      { dday.length ? ( 
        <>
          <div className='section__des mb20'>
            <div>
              <h2 className='title mb4'>{t("dday.title")}</h2>
              <p className='sub'>{t("dday.description")}</p>
            </div>
          </div>
          <div className='sction__contents'>
            <div className='card-list'>
              <div className='card-container'>
                {dday.map((ele) => {
                  return (
                    <Card data={ele}/>
                  )
                })}
              </div>
            </div>
          </div>
        </>
        ) : null }
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
              data={data.slice(1,6)} 
              uid={uid}
            />
          </div>
        </div>
      </section>
    </main>
  )

}

export default Home