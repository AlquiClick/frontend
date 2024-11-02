import React from 'react';

const HeaderContainer = () => {
    return (
        <header style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            background: '#3B82F6',
            textAlign: 'left',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        }}>
            <h1>AlquiClick</h1>
        </header>
    );
}

export default HeaderContainer;