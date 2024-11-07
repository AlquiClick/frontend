import React, { useState } from 'react';
import UpdateUserForm from '../users/UpdateUserForm';
import DeleteForm from '../users/DeleteForm';
import { Fieldset } from 'primereact/fieldset';
import '../../styles/profile.css';


const ProfileContainer = ({ username }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleEditClick = () => {
        setShowUpdateModal(true);
    };

    const handleCloseModal = () => {
        setShowUpdateModal(false);
    };

    return (
        <div className='profile-container'>
            <Fieldset legend="Información del perfil" toggleable>
                <p className="m-0">
                </p>
            </Fieldset>
            <button onClick={handleEditClick}>Editar</button>
            {showUpdateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <UpdateUserForm onClose={handleCloseModal} />
                    </div>
                </div>
            )}
            <DeleteForm username={username} />
        </div>
    );
};

export default ProfileContainer;
