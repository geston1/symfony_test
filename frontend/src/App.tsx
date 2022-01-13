import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import useAuth from './hooks/useAuth';
import Login from './pages/Login';
import Me from './pages/Me';

function App() {

  const { logedin } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PrivateRoute condition={!logedin} redirect={'/'}/>}>
            <Route path="/login" element={<Login/>} />
          </Route>
          <Route path="/" element={<PrivateRoute condition={logedin} redirect={'/login'}/>}>
            <Route path="/" element={<Me/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
