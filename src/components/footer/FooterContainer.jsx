import React from 'react';

const FooterContainer = () => {
    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            background: '#3B82F6',
            textAlign: 'center',
            boxShadow: '0px -2px 5px rgba(0,0,0,0.1)',
            zIndex: 1000
        }}>
            <p>&copy; {new Date().getFullYear()} AlquiClick. Todos los derechos reservados.</p>
        </footer>
    );
};

export default FooterContainer;
