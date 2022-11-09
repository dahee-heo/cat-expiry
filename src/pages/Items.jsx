import React, { useEffect, useState } from 'react'
import { SearchOutlined, Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'
import axios from 'axios'
// import { groceries } from '../states/groceriesState'
import { useRecoilState } from 'recoil'
import { itemsRead, itemsDelete } from '../service/items.service'
import { DeleteBtn, FormStyle, MainStyle, TableStyle, EditBtn } from '../components/styled'
import { EditSharp, KeyboardArrowDownSharp, KeyboardArrowUpSharp, RemoveCircleOutline } from '@mui/icons-material'

const Items = () => {

  const [itemsData, setItemsData] = useState([])
  const [searchText, setSearchText] = useState('')


  useEffect(() => {
    loadItems()
  }, [itemsData])

  const url = process.env.REACT_APP_DATABASE_URL;

  const loadItems = async () => {
    try {
      const response = await itemsRead()
      const itemsList = [];
      for (const key in response.data) {
        const item = response.data[key]
        if (item.name.indexOf(searchText) === -1) continue;
        item.key = key
        itemsList.push(item)
      }
      setItemsData(itemsList)
    } catch (error) {
      console.log(error)
    }
  }


  const itemsUpdate = async (grocery) => {
    try {
      const updateData = {
        ...grocery,
        expire: grocery.expire,
      }
      const res = await axios.patch(`${url}/items/${grocery.key}.json`)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <MainStyle>
      <FormStyle onSubmit={event => {
        event.preventDefault();
      }}>
        <input type="text" name='name' placeholder='검색어를 입력해주세요.' onChange={e => setSearchText(e.target.value)} />
        <button><SearchOutlined /></button>
      </FormStyle>

      <div>
        <TableStyle>
          <thead>
            <tr>
              <th>No</th>
              <th>
                <span className='title-names'>
                  Name
                  <span><KeyboardArrowUpSharp sx={{ fontSize: 18 }} /></span>
                  <span><KeyboardArrowDownSharp sx={{ fontSize: 18 }} /></span>
                </span>
              </th>
              <th>
                <span className='title-names'>
                  Enter
                  <span><KeyboardArrowUpSharp sx={{ fontSize: 18 }} /></span>
                  <span><KeyboardArrowDownSharp sx={{ fontSize: 18 }} /></span>
                </span>
              </th>
              <th>
                <span className='title-names'>
                  Expire
                  <span><KeyboardArrowUpSharp sx={{ fontSize: 18 }} /></span>
                  <span><KeyboardArrowDownSharp sx={{ fontSize: 18 }} /></span>
                </span>
              </th>
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {
              itemsData.map((grocery, index) => {
                // console.log('grocery: ', grocery);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{grocery.name}</td>
                    <td>{grocery.enter}</td>
                    <td>{grocery.expire}</td>
                    <td>
                      <EditBtn><span><EditSharp /></span></EditBtn>
                    </td>
                    <td>
                      <DeleteBtn onClick={() => itemsDelete(grocery)}><span><RemoveCircleOutline /></span></DeleteBtn>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </TableStyle>
      </div>

    </MainStyle>
  )
}

export default Items