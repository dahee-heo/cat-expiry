import React from 'react'
import { Modal, Box, Select, MenuItem } from '@mui/material'
import { Button } from '../components/Button';
import { useTranslation } from "react-i18next";

export const Regist = ({open, handleClose}) => {
  const { t } = useTranslation();

  return (
    <main className='regist'>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <h2>
          {t("registration")}
        </h2>
        <div className='select-box'>
          <label htmlFor="cartegory">{t("category")}</label>
          <select name="" style={{width: "100%"}} id="category">
            <option value="dry">{t("dry")}</option>
            <option value="wet">{t("wet")}</option>
            <option value="snack">{t("snack")}</option>
            <option value="nutrition">{t("nutrition")}</option>
          </select>
          {/* <div className='label'>카테고리</div> */}
          {/* <Select
            fullWidth
            defaultValue="dry"
            size="small"
          >
            <MenuItem value="dry">건식사료</MenuItem>
            <MenuItem value="wet">습식사료</MenuItem>
            <MenuItem value="snack">간식</MenuItem>
            <MenuItem value="nutrition">영양제</MenuItem>
          </Select> */}
        </div>
        <div>
          <label htmlFor="name">{t("name")}</label>
          <input type="text" name="" id="name" placeholder={`${t("regist.namePlaceholder")}`}/>
        </div>
        <div>
          <label htmlFor="enter">{t("registrationDate")}</label>
          <input
            type='date'
            // defaultValue={grocery.expire}
            // onChange={(e) => {
            //   editExpire(grocery, e)
            // }
            // }
          />
        </div>
        <div>
          <label htmlFor="expire">{t("expiration")}</label>
          <input
            type='date'
            // defaultValue={grocery.expire}
            // onChange={(e) => {
            //   editExpire(grocery, e)
            // }
            // }
          />
        </div>
        <div className='btn-wrap'>
          <Button width="49%" type="secondary mr4" text={`${t("cancel")}`}/>
          <Button width="49%" type="primary" text={`${t("register")}`}/>
        </div>
      </form>
    </main>
  )
}
