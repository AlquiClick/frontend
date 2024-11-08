import React from 'react';
import '../../styles/header.css';

const HeaderContainer = () => {
    const isLoggedIn = JSON.parse(localStorage.getItem('token')) ? true : false;
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <header className="headerContainer">
            <div className="logo-section">
                <img src="/path/to/logo.png" alt="Logo" className="logo" />
                <h2>AlquiClick</h2>
            </div>
            <div className="menu-section">
                {isLoggedIn ? (
                    <div className="user-info">
                        <div className="dropdown">
                            <button className="dropdown-button">Hola, {username}</button>
                            <div className="dropdown-content">
                                <a href="/profile">Perfil</a>
                                <a href="/property">Mis Alquileres</a>
                                <button onClick={handleLogout}>Cerrar sesión</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <a href="/login" className="login-link">Login</a>
                )}
            </div>
        </header>
    );
}

export default HeaderContainer;
