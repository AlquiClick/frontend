import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderContainer from './components/header/HeaderContainer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/users/RegisterForm';
import UpdateUserForm from './components/users/UpdateUserForm';
import HomeContainer from './components/home/HomeContainer';
import './styles/login.css';

const usuariotest = {
  username: 'pelao',
  email: 'pela2@gmail.com',
  role: 'user',
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <HeaderContainer />
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/update-user" element={<UpdateUserForm user={usuariotest} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
