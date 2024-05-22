// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdministrarMascotas from './components/AdministrarMascotas';
import AdicionarMascotas from './components/AdicionarMascotas';
import RegisterUser from './components/RegisterUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<AdministrarMascotas />} />
        <Route path='/adicionar' element={<AdicionarMascotas />} />
        <Route path='/registrar' element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
