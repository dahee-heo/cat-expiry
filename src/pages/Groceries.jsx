import React from 'react'
import { Edit, KeyboardArrowUp, KeyboardArrowDown, RemoveCircle } from '@material-ui/icons'

const Groceries = () => {

  return (
    <main>
      <form>
        <input type="text" name='name' />
        <button><Edit /></button>
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
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td>조공 츄르</td>
              <td>2022-09-23</td>
              <td><input type='date' value='2023-09-23' /></td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>오메가3</td>
              <td>2022-07-10</td>
              <td><input type='date' value='2023-01-10' /></td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>템테이션</td>
              <td>2022-06-19</td>
              <td><input type='date' value='2023-06-19' /></td>
              <td>
                <button><span><RemoveCircle /></span></button>
              </td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>로얄캐닌 헤파틱</td>
              <td>2022-08-20</td>
              <td><input type='date' value='2025-08-20' /></td>
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

export default Groceries