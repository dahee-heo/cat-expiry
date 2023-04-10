import { ErrorOutline } from '@material-ui/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { useTranslation } from "react-i18next";

export const Error = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

  return (
    <main className='empty'>
      <div className='empty__wrap'>
        <ErrorOutline/>
        <h2>{t("error.headline")}</h2>
        <p>{t("error.sub")}</p>
        <Button 
          onClick={() => navigation(-1)} 
          type="secondary" 
          text="돌아가기"
        />
      </div>
    </main>
  )
}
