import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const color = {
  primary: '#E10000',
}


const Logo = styled.h1`
  display: flex;

  & > img{
    width: 100px;

    &:hover{
      transform: rotate(-5deg)
    }
  }
`
const Main = styled.main`
    display: flex;
    height: 360px;
    font-size: 16px;
  `
const MainVidual = styled.div`
    width: 100%;
    height: 80vh;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;


    & > .text-area{
      display: flex;
      flex-direction: column;
      color: #444;
      
      &  h2{
        font-size: 2.5rem;
        font-weight: 800;

        & > span{
          color: black;
        }
      }

      & button {
        height: 48px;
        width: 200px;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 700;
        color: white;
        border: none;
        cursor: pointer;
      }

      & button:first-child {
        margin-right: 10px;
        margin-bottom: 10px;
        background-color: ${color.primary};

        &:hover{
          background-color: #D20000;
        }
      }

      & button:last-child {
        margin-right: 10px;
        background-color: #CA0000;

        &:hover{
          background-color: #BB0000;
        }
      }

      & a {
        text-decoration: none;
        color: white;
      }
    }

    & > div:last-child{
      width: 40vw;
      height: auto;

      & > img{
        width: 100%;
        height: 100%;
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
    color: ${color.primary};
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
        color: ${color.primary};
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
  color: ${color.primary};    
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

export { NavStyle, HeaderDiv, FormStyle, MainStyle, TableStyle, DeleteBtn, EditBtn, AccoutDiv, Logo, Main, MainVidual }