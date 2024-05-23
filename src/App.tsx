import React from 'react'
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Seedlings from './pages/Seedlings/Seedlings';
import Seeds from './pages/Seeds/Seeds';
import Office from './pages/Office/Office';
import { Provider } from 'react-redux';
import store from './store/store';
import Mistakes from './pages/Mistakes/Mistakes';
import Cultivation from './pages/Cultivation/Cultivation';
import PlantingSeeds from './pages/PlantingSeeds/PlantingSeeds';
import SeedGermination from './pages/SeedGermination/SeedGermination';
import Calendar from './pages/Calendar/Calendar'

function App() {
  return (
    <div className="App">
      <Provider store={store}> 
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/seedGermination' element={<SeedGermination/>} />
        <Route path='/plantingSeeds' element={<PlantingSeeds/>} />
        <Route path='/cultivation' element={<Cultivation/>} />
        <Route path='/mistakes' element={<Mistakes/>}/>
        <Route path='/' element={<Home />} />
        <Route path='user/register' element={<Register />} />
        <Route path='/seedlings' element={<Seedlings />} />
        <Route path='/seeds' element={<Seeds />} />
        <Route path='/seeds/calendar/:seedName' element={<Calendar/>} />
        <Route path='/office' element={<Office />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App







