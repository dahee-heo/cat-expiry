import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Items';
import Groceries from './pages/Groceries';
import Header from './components/Header';
import { Suspense, useState } from 'react';



function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/items' element={<Items></Items>}></Route>
          <Route path='/groceries' element={<Groceries></Groceries>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
