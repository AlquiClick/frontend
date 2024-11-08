import React, { useState, useEffect } from 'react';
import UpdateUserForm from '../users/UpdateUserForm';
import DeleteForm from '../users/DeleteForm';
import { Fieldset } from 'primereact/fieldset';
import '../../styles/profile.css';

const ProfileContainer = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null); // Para almacenar la información del usuario

    const handleEditClick = () => {
        setShowUpdateModal(true);
    };

    const handleCloseModal = () => {
        setShowUpdateModal(false);
    };

    const handleUserInfo = async () => {
        const user_id = localStorage.getItem('user_id');
        const token = JSON.parse(localStorage.getItem('token'));

        try {
            const response = await fetch('http://127.0.0.1:5000/user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({user_id: user_id})
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("User data obtained:", data);
                setUserInfo(data); // Guardamos la información del usuario
            } else {
                const errorData = await response.json();
                console.error('Error obtaining user:', errorData.message);
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('A network error occurred. Please try again.');
        }
    };

    useEffect(() => {
        handleUserInfo();
    }, []);

    return (
        <div className='profile-container'>
            <Fieldset legend="Información del perfil" toggleable>
                {userInfo ? (
                    <p className="m-0">{`Username: ${userInfo.username}`}</p>
                ) : (
                    <p className="m-0">Cargando información del usuario...</p>
                )}
            </Fieldset>
            <button onClick={handleEditClick}>Editar</button>
            {showUpdateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <UpdateUserForm onClose={handleCloseModal} />
                    </div>
                </div>
            )}
            <DeleteForm />
        </div>
    );
};

export default ProfileContainer;
