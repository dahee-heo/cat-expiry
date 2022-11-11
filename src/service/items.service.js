import axios from "axios";
import { users } from "../states/userState";

const hostUrl = process.env.REACT_APP_DATABASE_URL;

export const itemsRead = async () => {
  return await axios.get(`${hostUrl}/${users.uid}/items.json`)
}

export const itemsCreate = async (createParams) => {
  const createData = {
    name: createParams.name,
    enter: createParams.enter,
    expire: createParams.expire,
  }
  return await axios.post(`${hostUrl}/${users.uid}/items.json`, createData)
}

export const itemsUpdate = async (updateParams) => {
  const updateData = {
    name: updateParams.name,
    enter: updateParams.enter,
    expire: updateParams.expire,
  }
  return await axios.patch(`${hostUrl}/${users.uid}/items/${updateParams.key}.json`, updateData)
}

export const itemsDelete = async (deleteParams) => {
  return axios.delete(`${hostUrl}/${users.uid}/items/${deleteParams.key}.json`)
}