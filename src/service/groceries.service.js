import axios from "axios";


const url = process.env.REACT_APP_DATABASE_URL;

export const groceriesRead = async (uid) => {
  return await axios.get(`${url}/${uid}/groceries.json`)
}

export const groceriesCreate = async (createParams, uid) => {
  return await axios.post(`${url}/${uid}/groceries.json`, createParams)
}

export const groceriesUpdate = async (updateParams, expireData, uid) => {
  const updateData = {
    expire: expireData.expire
  }
  return await axios.patch(`${url}/${uid}/groceries/${updateParams.key}.json`, updateData)
}

export const groceriesDelete = async (deleteParams, uid) => {
  return axios.delete(`${url}/${uid}/groceries/${deleteParams}.json`)
}