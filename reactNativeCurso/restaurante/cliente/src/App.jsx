import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Ordenes from './components/paginas/Ordenes';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import SideBar from './components/ui/sidebar';

function App() {

  return (
    <div>
      <SideBar />
      <Routes>
        <Route path='/' element={<Ordenes />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/nuevo-platillo' element={<NuevoPlatillo />} />
      </Routes>
    </div>
  )
}

export default App
