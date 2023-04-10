import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.page';
import Header from './components/Header';
import { Suspense, useState } from 'react';
import { useRecoilState } from 'recoil';
import { users } from './states/userState'
import './styles/main.scss'
import { Bookmarks } from './pages/Bookmarks.page';
import { MypageModal } from './components/MypageModal';
import { BottomMenu } from './components/BottomMenu';
import { Regist } from './pages/Regist.page';
import { Empty } from './pages/Empty.page';
import "./config/lang/i18n";
import { Products } from './pages/Products.page';
import { Edit } from './pages/Edit.page';
import PrivateRoute from './routes/PrivateRoute';
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  const [loginUser, setLoginUser] = useRecoilState(users)
  const uid = loginUser.uid
  const locale = navigator.language;
  localStorage.setItem("locale", locale)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route path='/' element={<Home uid={uid}/>}></Route>
        <Route path='/home' element={<Home uid={uid}/>}></Route>
        <Route path='/products' element={<Products uid={uid} />}></Route>
        <Route path='/regist' element={<Regist uid={uid} />}></Route>
        <Route path='/bookmarks' element={<Bookmarks uid={uid}/>}></Route>
        <Route path='/side-menu' element={<MypageModal />}></Route>
        <Route path='/empty' element={<Empty />}></Route>
        <Route path='/edit' element={<Edit />}></Route>
        <Route 
          path='/edit/:key' element={
            <PrivateRoute
              authenticated={uid}
              component={<Edit uid={uid}/>}
            />
          }></Route>
      </Routes>
      <BottomMenu/>
    </Suspense>
  );
}

export default App;
