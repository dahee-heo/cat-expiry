import axios from "axios";

const hostUrl = process.env.REACT_APP_DATABASE_URL;

export const getProducts = async (uid, filter, sortType) => {
  const { data } = await axios.get(`${hostUrl}/${uid}/products.json`)
  //파이어베이스 [키:{오브젝트}] 유형 [{오브젝트}] 유형으로 변경
  const dataArray = [];
  for (const key in data) {
    const product = data[key]
    product.key = key
    dataArray.push(product)
  }

  const filterCondition = product => {
    const date = new Date(product.expire)
    const now = Date.now()
    return date.getTime() - now < 1000 * 60 * 60 * 24 * 7
  }
  const filteredData = filter === "impending" ? dataArray.filter(filterCondition) : dataArray;
  
  const sortCondition =  (key) => (a, b) => {
    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
  };
  const sortedData = sortType ? filteredData.sort(sortCondition(sortType)) : filteredData;
  return sortedData;
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