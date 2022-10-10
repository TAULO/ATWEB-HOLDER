import React from 'react'
import { Routes, Route } from 'react-router-dom';

import AdminLandingPage from '../AdminLandingPage/AdminLandingPage';
import AddImagesForm from "../AddImageForm/AddImagesForm"
import AddExhibtionsForm from "../AddExhibitionsForm/AddExhibtionsForm.js"

export default function AdminContainer() {
    return (
    <Routes>
        <Route path='/admin' element={<AdminLandingPage></AdminLandingPage>}></Route>
        <Route path='/admin/tilfoj-billeder' element={<AddImagesForm></AddImagesForm>}></Route>
        <Route path='/admin/tilfoj-udstillinger' element={<AddExhibtionsForm></AddExhibtionsForm>}></Route>
    </Routes>
    )
}


