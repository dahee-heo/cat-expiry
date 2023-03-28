import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.page';
import Items from './pages/Items.page';
import Groceries from './pages/Groceries.page';
import Header from './components/Header';
import { Suspense, useState } from 'react';
import { useRecoilState } from 'recoil';
import { users } from './states/userState'
import './styles/main.scss'
import { Bookmark } from './pages/Bookmark.page';
import { MypageModal } from './components/MypageModal';
import { BottomMenu } from './components/BottomMenu';
import { Regist } from './pages/Regist.page';
import { Empty } from './pages/Empty.page';
import "./config/lang/i18n";

function App() {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const uid = loginUser.uid

  return (
    <div className='app-bg'>
      <div id='app'>
        <Suspense fallback={<div>Loading...</div>}>
          <Header uid={uid} />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/items' element={<Items uid={uid} />}></Route>
            <Route path='/regist' element={<Regist />}></Route>
            {/* <Route path='/groceries' element={<Groceries uid={uid} />}></Route> */}
            <Route path='/bookmark' element={<Bookmark />}></Route>
            <Route path='/side-menu' element={<MypageModal />}></Route>
            <Route path='/empty' element={<Empty />}></Route>
          </Routes>
          <BottomMenu/>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
