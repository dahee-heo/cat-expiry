import axios from "axios";

const hostUrl = process.env.REACT_APP_DATABASE_URL;

export const itemsRead = async (uid) => {
  return await axios.get(`${hostUrl}/${uid}/items.json`)
}

export const itemsCreate = async (createParams, uid) => {
  const createData = {
    name: createParams.name,
    enter: createParams.enter,
    expire: createParams.expire,
  }
  return await axios.post(`${hostUrl}/${uid}/items.json`, createData)
}

export const itemsUpdate = async (updateParams, uid) => {
  const updateData = {
    name: updateParams.name,
    enter: updateParams.enter,
    expire: updateParams.expire,
  }
  return await axios.patch(`${hostUrl}/${uid}/items/${updateParams.key}.json`, updateData)
}

export const itemsDelete = async (deleteParams, uid) => {
  return axios.delete(`${hostUrl}/${uid}/items/${deleteParams.key}.json`)
}