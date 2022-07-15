import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { Navigations } from './components/Navigations';

function App() {
   return (
      <>
         <Navigations />
         <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
         </Routes>
      </>
   );
}

export default App;
