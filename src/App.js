import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardsAndCommissions from './components/pages/BoardsAndCommissions';
import Departments from './components/pages/Departments';
import Community from './components/pages/Community';
import Business from './components/pages/Business';
import VisitUs from './components/pages/VisitUs';
import Register_Login from './components/pages/Register_Login';
import ForgetPassword from './components/pages/ForgetPassword';
import PDFConverterPage from "./components/pages/PDFConverterPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' exact element={ <Home />}></Route>
        <Route path='/boards-and-commissions' exact element={ <BoardsAndCommissions />}></Route>
        <Route path='/departments' exact element={ <Departments />}></Route>
        <Route path='/community' exact element={ <Community />}></Route>
        <Route path='/business' exact element={ <Business />}></Route>
        <Route path='/visit-us' exact element={ <VisitUs />}></Route>
        <Route path='/register-login' exact element={ <Register_Login />}></Route>
        <Route path='/reset' exact element={ <ForgetPassword />}></Route>
        <Route path= '/pdf-converter' exact element = {<PDFConverterPage/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;