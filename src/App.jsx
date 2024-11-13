import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderContainer from './components/header/HeaderContainer';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchV2Form';
import LoginV2Form from './components/LoginV2Form';
import RegisterForm from './components/users/RegisterForm';
import HomeContainer from './components/home/HomeContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import PropertyContainer from './components/properties/PropertyContainer';
import './styles/login.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <HeaderContainer />
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<ProfileContainer />} />
          <Route path="/property" element={<PropertyContainer />} />
          <Route path="/loginv2" element={<LoginV2Form />} />
          <Route path="/busqueda" element={<SearchForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
