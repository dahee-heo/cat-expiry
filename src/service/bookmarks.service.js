import axios from "axios";

const hostUrl = process.env.REACT_APP_DATABASE_URL;

export const getBookmarks = async (uid, filter) => {
  const { data } = await axios.get(`${hostUrl}/${uid}/bookmarks.json`)
  //파이어베이스 [키:{오브젝트}] 유형 [{오브젝트}] 유형으로 변경
  const dataArray = [];
  for (const key in data) {
    const bookmark = data[key]
    bookmark.key = key
    dataArray.push(bookmark)
  }

  const compare = (filterType) => (a, b) => {
    return a[filterType] > b[filterType] ? 1 : a[filterType] < b[filterType] ? -1 : 0;
  };
  const filteredData = filter === "name" ? dataArray.sort(compare(filter)) : dataArray;
  return filteredData;
}

export const postBookmarks = async (params) => {
  const { data } =  await axios.post(`${hostUrl}/${params.uid}/bookmarks.json`, params.inputData)
  return data;
}

export const patchBookmarks = async (params) => {
  const { data } = await axios.patch(`${hostUrl}/${params.uid}/bookmarks/${params.key}.json`, params.inputData)
  return data; 
}

export const deleteBookmarks = async (params) => {
  const promises = await params.keyArray.map((id)=>{
    return axios.delete(`${hostUrl}/${params.uid}/bookmarks/${id}.json`);
  });
  return Promise.all(promises);
  // const { data } = await axios.delete(`${hostUrl}/${params.uid}/bookmarks/${params.key}.json`)
  // return data; 
}