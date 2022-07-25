import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css"
import Main from './components/main/Main';
import InstagramImages from './components/instagramImages/InstagramImages';
import About from './components/about/about';
import ExhibitionTemplate from './components/Exhibition/ExhibitionTemplate';
import Header from "./components/header/Header"
import Footer from './components/footer/footer';
import AddImagesForm from "./components/_admin/AddImageForm/AddImagesForm"
import AddExhibtionsForm from './components/_admin/AddExhibitionsForm/AddExhibtionsForm';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path='/instagram' element={<InstagramImages/>}></Route>
        <Route path='/udstillinger' element={<ExhibitionTemplate></ExhibitionTemplate>}></Route>
          {/* <About></About> */}
      </Routes>
    <Footer />
    <Routes>
      <Route path='/admin' element={<AddImagesForm></AddImagesForm>}></Route>
      <Route path='/admin1' element={<AddExhibtionsForm></AddExhibtionsForm>}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
