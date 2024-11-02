import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CreateUserForm from './components/Users/CreateUserForm';
import UpdateUserForm from './components/Users/UpdateUserForm';
import HomeContainer from './components/home/HomeContainer';
import RegisterContainer from './components/register/RegisterContainer';
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
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterContainer />} />
          <Route path="/create-user" element={<CreateUserForm />} />
          <Route path="/update-user" element={<UpdateUserForm user={usuariotest} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
