import React, { useEffect, useState } from 'react'
import { Button } from '../components/Button';
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import { postProducts } from '../service/products.service';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const Regist = ({ uid }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    category: "dry",
    name: "",
    enter: format(new Date(), 'yyyy-MM-dd'),
    expire: null,
  })

  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(()=>{
    console.log(inputData)
  },[inputData])

  const mutation = useMutation((registData) => postProducts(registData), {
    onMutate: variable => {
      console.log("onMutate", variable);
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onError: (error, variable, context) => {
      console.log('error: ', error);
      // error
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
    onSettled: () => {
      console.log("end");
    }
  })

  const onRegist = () => {
    const registData = {inputData, uid}
    mutation.mutate(registData, uid)
    navigate('/products')
  }

  return (
    <main className='regist'>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <h2>
          {t("registration")}
        </h2>
        <div className='select-box'>
          <label htmlFor="cartegory">{t("category")}</label>
          <select name="category" style={{width: "100%"}} id="category" onChange={onChange}>
            <option value="dry">{t("dry")}</option>
            <option value="wet">{t("wet")}</option>
            <option value="snack">{t("snack")}</option>
            <option value="nutrition">{t("nutrition")}</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">{t("name")}</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder={`${t("regist.namePlaceholder")}`}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="enter">{t("registrationDate")}</label>
          <input
            type='date'
            name="enter"
            disabled
            defaultValue={inputData.enter}
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
            name="expire"
            onChange={onChange}
            // defaultValue={grocery.expire}
            // onChange={(e) => {
            //   editExpire(grocery, e)
            // }
            // }
          />
        </div>
        <div className='btn-wrap'>
          <Button 
            width="49%" 
            type="secondary mr4" 
            text={`${t("cancel")}`}
          />
          <Button 
            width="49%" 
            type="primary" 
            text={`${t("register")}`}
            onClick={onRegist}
          />
        </div>
      </form>
    </main>
  )
}
