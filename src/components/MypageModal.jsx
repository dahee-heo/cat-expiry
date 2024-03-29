import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { googleLogin, logout, guestLogin } from '../service/login.service';
import { authService } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { users } from '../states/userState';
import { CheckCircleOutline, HelpOutline, MailOutline } from '@material-ui/icons';
import { Modal, Box } from '@mui/material'
import { Google } from '@mui/icons-material';
import { useTranslation } from "react-i18next";

export const MypageModal = ({open, setMenuOpen, handleClose}) => {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const [loginView, setLoginView] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation();

  const handleClick = e => {
    e.preventDefault();
    setLoginView(!loginView)
  }


  const handleGuestLogin = async () => {
    await guestLogin()
    handleClose()
    window.location.reload()
  }

  const handleLogout = () => {
    logout()
    navigate('/home')
    window.location.reload()
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
                      <li className='account__name'><span>{loginUser.displayName || `${t("guest")}`}</span></li>
                      <li className='logout' onClick={handleLogout}>{t("mypage.logout")}</li>
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
                        <li onClick={handleGuestLogin}><MailOutline/>{t("mypage.loginGuest")}</li>
                      </ul>
                    </div> 
                }
        </aside>
      </div>
      </Box>
    </Modal>
    
  )
}
