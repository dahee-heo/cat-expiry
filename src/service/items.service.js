import axios from "axios";

const hostUrl = process.env.REACT_APP_DATABASE_URL;

export const itemsRead = async () => {
  return await axios.get(`${hostUrl}/items.json`)
}

export const itemsCreate = async (createParams) => {
  const createData = {
    name: createParams.name,
    enter: createParams.enter,
    expire: createParams.expire,
  }
  return await axios.post(`${hostUrl}/items.json`, createData)
}

export const itemsUpdate = async (updateParams) => {
  const updateData = {
    name: updateParams.name,
    enter: updateParams.enter,
    expire: updateParams.expire,
  }
  return await axios.patch(`${hostUrl}/items/${updateParams.key}.json`, updateData)
}

export const itemsDelete = async (deleteParams) => {
  return axios.delete(`${hostUrl}/items/${deleteParams.key}.json`)
}