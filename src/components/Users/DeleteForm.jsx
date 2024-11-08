import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const DeleteForm = ({ username }) => {
    const [inputValue, setInputValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const toast = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsDisabled(value !== `eliminar ${username}`);
    };

    const handleDeleteAccount = async () => {
        let user_id = localStorage.getItem('user_id') ?? '';
        const token = JSON.parse(localStorage.getItem('token'));

        if (!isDisabled) {
            const bodyUpdateUser = {
                user_id: user_id,
              };


            try {
            const response = await fetch('http://127.0.0.1:5000/user-delete', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bodyUpdateUser),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User delete successfully:', data.message);
                alert(data.message);
            } else {
                const errorData = await response.json();
                console.error('Error delete user:', errorData.message);
                alert(`Error: ${errorData.message}`);
            }
            } catch (error) {
            console.error('Network error:', error);
            alert('A network error occurred. Please try again.');
            }

            // Lógica para eliminar la cuenta
            alert("Cuenta eliminada");
        }
    };

    const acceptDelete = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        handleDelete()
    }

    const rejectDelete = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirmDeleteUser = () => {
        confirmDialog({
            message: `¿Estás seguro de que quieres eliminar la cuenta de ${username}?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            rejectClassName: 'p-button-secondary',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            accept: () => handleDeleteAccount(),
        });
    };

    return (
        <div className="delete-form">
            <h4>Eliminar Cuenta</h4>
            <p>Para eliminar, debe escribir "eliminar" seguido de su nombre de usuario</p>
            <input
                className='delete-input'
                type="text"
                placeholder={`eliminar ${username}`}
                value={inputValue}
                onChange={handleInputChange}
            />
            <Toast ref={toast} />
            <ConfirmDialog />
            <Button
                className="delete-button"
                onClick={confirmDeleteUser}
                icon="pi pi-times"
                label="Eliminar cuenta"
                disabled={isDisabled}>
            </Button>
        </div>
    );
};

export default DeleteForm;
