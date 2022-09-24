import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Items';
import Groceries from './pages/Groceries';
import Header from './components/Header';

function App() {


  return (
    <>
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
