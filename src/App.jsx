import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CreateUserForm from './components/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm';
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
          <Route path="/" element={<LoginForm />} />

          <Route path="/create-user" element={<CreateUserForm />} />

          <Route path="/update-user" element={<UpdateUserForm user={usuariotest} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
