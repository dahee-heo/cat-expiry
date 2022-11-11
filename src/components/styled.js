import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Input } from '@material-ui/core'
import { style } from '@mui/system'

const Logo = styled.h1`
  display: flex;

  & > img{
    width: 100px;

    &:hover{
      transform: rotate(-5deg)
    }
  }
`


const MainStyle = styled.main`
  padding: 20px;
`

const NavStyle = styled(NavLink)`
  margin-right: 20px;
  border: none;
  color: black;
  text-decoration: none;
  
  &.active {
    color: #E10000;
  }
`

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 20px;
  border-bottom: 1px solid #eee;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-weight: 800;
`

const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  
  & > input {
    height: 44px;
    width: 300px;
    border: 1px solid #eee;
    border-radius: 3px;
    margin-right: 4px;
    padding: 10px;
    box-sizing: border-box;
  }

  & > button {
    border: none;
    width: 44px;
    height: 44px;
  }

`

const TableStyle = styled.table`
  border-collapse: collapse;
  width: 100%;

  & th {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 14px;  
    padding: 10px;
    border-bottom: 1px solid #ccc; 
    
    & .title-names{
      position: relative;

      & > span {
        text-decoration: none;
      }

      & .active{
        color: #E10000;
      }

      & > span:first-child {
        position: absolute;
        top: -5px;
      }
      & > span:last-child {
        position: absolute;
        bottom: -8px;
      }
    }
  }

  & td{
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 16px;  
    padding: 10px;
    border-bottom: 1px solid #eee; 
    text-align: center;
    
    & input[type='date'] {
      font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
      font-size: 16px;  
      padding: 10px;
      border: none;
      background-color: #f8f8f8;
    }
  }
`

const DeleteBtn = styled.button`
  border: none;
  background: none;
  color: #E10000;    
  cursor:pointer;
`

const EditBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`

const AccoutDiv = styled.div`
  cursor:pointer; 

  & > .account-menu{
    position: relative;
    
    & > ul{      
      display: none;
      position: absolute;
      width: 100px;
      margin: 0;
      padding: 4px 0;
      top: 30px;
      right: 0;
      background-color: white;
      border: 1px solid #eee;
      border-radius: 5px;
      
      & > li{
        padding: 4px 10px;
        font-weight: 400;
        font-size: 14px;
        list-style: none;
      }
    }

    & > .active {
      display: block;
    }
  }
`

export { NavStyle, HeaderDiv, FormStyle, MainStyle, TableStyle, DeleteBtn, EditBtn, AccoutDiv, Logo }