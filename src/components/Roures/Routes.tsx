import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../../pages/Home/Home';

function AppRoutes() {
return (
<Routes>
<Route index element={<Home/>}/>
</Routes>
);
}

export default AppRoutes
