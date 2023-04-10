import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";

export const Card = ({ data }) => {
  const { t } = useTranslation();
  const [cate, setCate] = useState("")

  const dayConvert = ( day ) => {
    return Math.ceil(( day ) / ( 1000 * 60 * 60 * 24 ))
  }
  const now = new Date();
  const expire = new Date(data.expire)
  const enter = new Date(data.enter);
  
  const dday = dayConvert(expire.getTime() - now)
  const period = dayConvert(expire.getTime() - enter.getTime())
  const rest = dayConvert(expire.getTime() - now)
  const progress = period - (period / 100 * rest)

  useEffect(() => {
    if (data.category === "dry") { setCate(`${t("dry")}`) }
    if (data.category === "wet") { setCate(`${t("wet")}`)}
    if (data.category === "snack") { setCate(`${t("snack")}`) }
    if (data.category === "nutrition") { setCate(`${t("nutrition")}`) }
  }, [cate])
  

  return (
    <>
      <div className='card mr8'>
        <div className='card__wrap'>
          <div className='card__txt mb12'>
            <p>{cate}</p>
            <h3>{data.name}</h3>
          </div>
          <div className='card__con'>
            <p>D-{dday}</p>
            <div className='progress'>
            <progress value={progress} max={period}></progress>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}
