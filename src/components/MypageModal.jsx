import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { googleLogin, googleLogout, guestLogin } from '../service/login.service';
import { authService } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { users } from '../states/userState';
import { countSelector } from '../states/itemsState';
import { CheckCircleOutline, HelpOutline, MailOutline } from '@material-ui/icons';
import { Modal, Box } from '@mui/material'
import { Google } from '@mui/icons-material';
import { useTranslation } from "react-i18next";


export const MypageModal = ({open, setMenuOpen, handleClose}) => {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const [loginView, setLoginView] = useState(false)
  // const expireCount = useRecoilValue(countSelector)
  const navigate = useNavigate()
  const { t } = useTranslation();

  useEffect(() => {
    onAuthStateChanged()
  }, [])


  const handleClick = e => {
    e.preventDefault();
    setLoginView(!loginView)
  }

  const onAuthStateChanged = () => {
    authService.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setLoginUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        })
      } else {
        setLoginUser({
          displayName: null,
          email: null,
          uid: null,
        })
        // if (window.location.pathname !== '/home') {
        //   nav('/')
        // }
      }
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{zIndex: "10"}}
    >
      <Box>
        <div className={`regist-modal open`}>
          <aside className='regist-modal__con'>
            <div className='regist-modal__top'>
              <ul className={`account__wrap${loginView ? ' active' : ''}`}>
                {loginUser.uid
                  ? <>
                      <li className='account__name'><span>{loginUser.displayName || '게스트'}</span>님 안녕하세요.</li>
                      <li className='logout' onClick={() => googleLogout()}>{t("mypage.logout")}</li>
                    </>
                  : <li>{t("mypage.pleaseLogin")}</li>
                }
              </ul>
            </div>
            {loginUser.uid
                  ? <div className='mypage-list pt20'>
                      <ul>
                        <NavLink to="/empty"><li><HelpOutline/>{t("mypage.help")}</li></NavLink>
                        <NavLink to="/empty"><li><CheckCircleOutline/>{t("mypage.appInfo")}</li></NavLink>
                      </ul>
                    </div>
                  : <div className='social'>
                      <ul>
                        <li onClick={googleLogin}><Google/>{t("mypage.loginGoogle")}</li>
                        <li onClick={guestLogin}><MailOutline/>{t("mypage.loginGuest")}</li>
                      </ul>
                    </div> 
                }
        </aside>
      </div>
      </Box>
    </Modal>
    
  )
}
