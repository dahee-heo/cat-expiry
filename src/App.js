import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Items';
import Groceries from './pages/Groceries';
import Header from './components/Header';
import { db } from './firebase.js';
import { addDoc, collection } from '@firebase/firestore';


function App() {
  return (
    <>
      <button onClick={addData}>추가</button>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='items' element={<Items></Items>}></Route>
          <Route path='groceries' element={<Groceries></Groceries>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
