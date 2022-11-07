import axios from "axios";

const url = process.env.REACT_APP_DATABASE_URL;

export const groceriesRead = async () => {
  return await axios.get(`${url}/groceries.json`)
}

export const groceriesCreate = async (createParams) => {
  return await axios.post(`${url}/groceries.json`, createParams)
}

export const groceriesUpdate = async (updateParams, expireData) => {
  const updateData = {
    expire: expireData.expire
  }
  return await axios.patch(`${url}/groceries/${updateParams.key}.json`, updateData)
}

export const groceriesDelete = async (deleteParams) => {
  return axios.delete(`${url}/groceries/${deleteParams}.json`)
}