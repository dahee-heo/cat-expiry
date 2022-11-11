import axios from "axios";
import { users } from "../states/userState";


const url = process.env.REACT_APP_DATABASE_URL;

export const groceriesRead = async () => {
  return await axios.get(`${url}/${users.uid}/groceries.json`)
}

export const groceriesCreate = async (createParams) => {
  return await axios.post(`${url}/${users.uid}/groceries.json`, createParams)
}

export const groceriesUpdate = async (updateParams, expireData) => {
  const updateData = {
    expire: expireData.expire
  }
  return await axios.patch(`${url}/${users.uid}/groceries/${updateParams.key}.json`, updateData)
}

export const groceriesDelete = async (deleteParams) => {
  return axios.delete(`${url}/${users.uid}/groceries/${deleteParams}.json`)
}