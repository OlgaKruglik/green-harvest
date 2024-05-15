import React from 'react'
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Seedlings from './pages/Seedlings';
import Seeds from './pages/Seeds';
import Office from './pages/Office/Office';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}> 
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='user/register' element={<Register />} />
        <Route path='/seedlings' element={<Seedlings />} />
        <Route path='/seeds' element={<Seeds />} />
        <Route path='/office' element={<Office />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App







