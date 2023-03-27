import { ErrorOutline } from '@material-ui/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export const Empty = () => {
  const navigation = useNavigate();

  return (
    <main className='empty'>
      <div className='empty__wrap'>
        <ErrorOutline/>
        <h2>페이지 준비중입니다.</h2>
        <p>페이지를 준비하고 있으니 조금만 기다려주세요. 감사합니다.</p>
        <Button 
          onClick={() => navigation(-1)} 
          type="secondary" 
          text="돌아가기"
        />
      </div>
    </main>
  )
}
