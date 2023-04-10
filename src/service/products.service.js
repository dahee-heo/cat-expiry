import axios from "axios";

const hostUrl = process.env.REACT_APP_DATABASE_URL;

export const getProducts = async (uid) => {
  const { data } = await axios.get(`${hostUrl}/${uid}/products.json`)
  //파이어베이스 [키:{오브젝트}] 유형 [{오브젝트}] 유형으로 변경
  const dataArray = [];
  for (const key in data) {
    const product = data[key]
    product.key = key
    dataArray.push(product)
  }
  return dataArray;
}

//edit 페이지에서 products 단일 데이터 가져오기
export const getProduct = async (params) => {
  const { data } = await axios.get(`${hostUrl}/${params.uid}/products/${params.key}.json`)
  return data;
}

export const postProducts = async (params) => {
  const { data } =  await axios.post(`${hostUrl}/${params.uid}/products.json`, params.inputData)
  return data;
}

export const patchProducts = async (params) => {
  const { data } = await axios.patch(`${hostUrl}/${params.uid}/products/${params.key}.json`, params.inputData)
  return data; 
}

export const deleteProducts = async (params) => {
  const { data } = await axios.delete(`${hostUrl}/${params.uid}/products/${params.key}.json`)
  return data; 
}