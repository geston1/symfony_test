import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="/"/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
