import React from 'react'
import { useTranslation } from "react-i18next";
import { GroceryListItems } from './GroceryListItems'

export const GroceryList = () => {
  const { t } = useTranslation();
  const home = true;

  return (
    <>
      <div className='table-header'>
        <ul className='tab-menu'>
          <li className='active'>{t("all")}</li>
          <li>{t("impending")}</li>
          <li>{t("finished")}</li>
        </ul>
        {
          home 
          ? <div className='all-view'>{t("viewAll")}</div>
          : <div>
              <select defaultValue="enter" name="" id="">
                <option value="name">{t("sortAlphabet")}</option>
                <option value="enter">{t("sortRegistration")}</option>
                <option value="expire">{t("sortExpiration")}</option>
              </select>
            </div>
        }
        
      </div>
      <div>
        <GroceryListItems/>
        <GroceryListItems/>
        <GroceryListItems/>
        <GroceryListItems/>
      </div>
      {/* <div className='no-regist'>
        <p>
          등록된 제품이 없습니다.
          아래 버튼을 클릭하여 추가해주세요.
        </p>
      </div> */}
    </>
  )
}
