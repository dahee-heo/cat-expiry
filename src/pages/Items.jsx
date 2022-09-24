import React from 'react'
import { SearchOutlined, Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'

const Items = () => {
  return (
    <main>
      <form>
        <input type="text" name='name' />
        <button><SearchOutlined /></button>
      </form>

      <div>
        <table>
          <thead>
            <tr>
              <th>Move</th>
              <th>
                <span>
                  Name
                  <span><KeyboardArrowUp /></span>
                  <span><KeyboardArrowDown /></span>
                </span>
              </th>
              <th>
                <span>
                  Enter
                  <span><KeyboardArrowUp /></span>
                  <span><KeyboardArrowDown /></span>
                </span>
              </th>
              <th>
                <span>
                  Expire
                  <span><KeyboardArrowUp /></span>
                  <span><KeyboardArrowDown /></span>
                </span>
              </th>
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>조공 츄르</td>
              <td>2022-09-23</td>
              <td>2023-09-23</td>
              <td>
                <button onClick><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>오메가3</td>
              <td>2022-07-10</td>
              <td>2023-01-10</td>
              <td>
                <button onClick><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>템테이션</td>
              <td>2022-06-19</td>
              <td>2023-06-19</td>
              <td>
                <button onClick><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>로얄캐닌 헤파틱</td>
              <td>2022-08-20</td>
              <td>2025-08-20</td>
              <td>
                <button onClick><span><Edit /></span></button>
              </td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  )
}

export default Items