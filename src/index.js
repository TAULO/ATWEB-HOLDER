import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./index.css"
import LandingPage from './components/LandingPage/LandingPage';
import InstagramImages from './components/InstagramImages/InstagramImages';
import ExhibitionTemplate from './components/Exhibition/ExhibitionTemplate';
import Header from "./components/header/Header"
import Footer from './components/footer/footer';
import AdminContainer from './components/_admin/AdminContainer/AdminContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Router>
    <Header/>
      <Routes>
        <Route render = {({location}) => {
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames="fade"></CSSTransition>
          </TransitionGroup>
        }} path="/" element={<LandingPage></LandingPage>}></Route>
        <Route render = {({location}) => {
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames="fade"></CSSTransition>
          </TransitionGroup>
        }} path='/instagram' element={<InstagramImages/>}></Route>
        <Route render = {({location}) => {
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames="fade"></CSSTransition>
          </TransitionGroup>
        }} path='/udstillinger' element={<ExhibitionTemplate></ExhibitionTemplate>}></Route>
      </Routes>
      <AdminContainer></AdminContainer>
    <Footer />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
