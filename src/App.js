import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.page';
import Header from './components/Header';
import { Suspense, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { users } from './states/userState'
import './styles/main.scss'
import { Bookmarks } from './pages/Bookmarks.page';
import { MypageModal } from './components/MypageModal';
import { BottomMenu } from './components/BottomMenu';
import { Regist } from './pages/Regist.page';
import { Empty } from './pages/Empty.page';
import { Loading } from './pages/Loading';
import "./config/lang/i18n";
import { Products } from './pages/Products.page';
import { Edit } from './pages/Edit.page';
import PrivateRoute from './routes/PrivateRoute';
import { QueryClient, QueryClientProvider } from "react-query";
import { authService } from './firebase';

function App() {
  const queryClient = new QueryClient();
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useRecoilState(users)
  const uid = loginUser.uid
  
  useEffect(() => {
    onAuthStateChanged()
  }, [])

  const onAuthStateChanged = () => {
    authService.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setLoginUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        })
        setIsLogin(true)
      } else {
        setLoginUser({
          displayName: null,
          email: null,
          uid: null,
        })
        setIsLogin(false)
      }
      setInit(true)
    })
  }

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <>
      {init ?
         (<>
          <Header />
            <Routes>
              <Route path='/' element={<Home uid={uid}/>}></Route>
              <Route path='/home' element={<Home uid={uid}/>}></Route>
              <Route path='/products' element={<Products uid={uid} />}></Route>
              <Route 
                path='/regist' element={
                <PrivateRoute
                  authenticated={uid}
                  component={<Regist uid={uid} />}
                />
              }></Route>
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
          </>
            )
              : (<Loading />)
          } 
        
        </>
    // </Suspense>
  );
}

export default App;
