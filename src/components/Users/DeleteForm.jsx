import React, { useState } from 'react';

const DeleteForm = ({ username }) => {
    const [inputValue, setInputValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsDisabled(value !== `eliminar ${username}`);
    };

    const handleDelete = () => {
        if (!isDisabled) {
            // Lógica para eliminar la cuenta
            alert("Cuenta eliminada");
        }
    };

    return (
        <div className="delete-form">
            <h2>Eliminar Cuenta</h2>
            <input
                type="text"
                placeholder={`eliminar ${username}`}
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleDelete} disabled={isDisabled}>Eliminar cuenta</button>
        </div>
    );
};

export default DeleteForm;
