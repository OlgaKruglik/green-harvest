import { Route, Routes } from 'express'
import React from 'react'
import Home from '../../pages/Home/Home'

function AppRoutes() {
    <Routes>
        <Route index element={<Home/>}/>
    </Routes>
}

export default AppRoutes
