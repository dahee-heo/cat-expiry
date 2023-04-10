import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { users } from '../states/userState';
// import { countSelector } from '../states/itemsState';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { Sidebar } from './MypageModal';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@material-ui/icons';
import i18n from '../config/lang/i18n';

const Header = () => {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const [loginView, setLoginView] = useState(false)
  // const expireCount = useRecoilValue(countSelector)
  const [menuOpen, setMenuOpen] = useState(false)
  const handleOpen = () => setMenuOpen(true)
  const navigation = useNavigate()
  const [openLng, setOpenLng] = useState(false)
  let classActive = openLng ? "active" : "";
  const locale = localStorage.getItem("locale") ?? "ko";
  const [browserLang, setBrowserLang] = useState("KOR")

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setOpenLng(false)
    localStorage.setItem("locale", lang)
    lang === "ko" ? setBrowserLang("KOR") : setBrowserLang("ENG")
  }

  useEffect(()=>{
    locale === "ko" || "ko-KR" 
      ? i18n.changeLanguage("ko") 
      : i18n.changeLanguage("en");
  }, [])

  return (
    <>
      <div className='header'>
        <div className='header__wrap'>
          <h1><Logo/></h1>
          <div 
            className={`global ${classActive}`} 
          >
            <div className='' onClick={() => setOpenLng(!openLng)}>
              {browserLang} <span className='arrow'></span></div>
            <ul className='slide'>
              <li onClick={()=>handleChangeLanguage("ko")}>
                KOR
              </li>
              <li onClick={()=>handleChangeLanguage("en")}>
                ENG
              </li>
            </ul>
          </div>
        </div>
        </div>
    </>
  )
}

export default Header