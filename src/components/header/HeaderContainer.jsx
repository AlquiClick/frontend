import React from 'react';
import '../../styles/header.css'

const HeaderContainer = () => {
    return (
        <header className='headerContainer' style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            background: '#3B82F6',
            textAlign: 'left',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        }}>
            <h2>AlquiClick</h2>
            <div>
                Login
            </div>
        </header>
    );
}

export default HeaderContainer;