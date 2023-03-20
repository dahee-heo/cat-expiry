import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Items from './pages/Items';
import Groceries from './pages/Groceries';
import { Header } from './components/Header';
import { Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { users } from './states/userState'
import { Add } from './pages/Add';
import { Container } from './styles/components/Container';
import NavBar from './components/NavigationBar';

function App() {
  const [loginUser, setLoginUser] = useRecoilState(users)
  const uid = loginUser.uid


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <Header uid={uid} />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/items' element={<Items uid={uid} />}></Route>
            <Route path='/groceries' element={<Groceries uid={uid} />}></Route>
          </Routes>
        </Container>
      </Suspense>
    </>
  );
}

export default App;
