import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';

const PropertyForm = ({ showDialog, setShowDialog, onSave, property, isEditing }) => {
    const [formData, setFormData] = useState({
        address: '',
        rooms: 0,
        bathrooms: 0,
        garage_capacity: 0,
        year_built: 0,
        monthly_rent: 0,
        active: true,
    });

    useEffect(() => {
        if (isEditing && property) {
            setFormData({
                address: property.address || '',
                rooms: property.rooms || 0,
                bathrooms: property.bathrooms || 0,
                garage_capacity: property.garage_capacity || 0,
                year_built: property.year_built || 0,
                monthly_rent: property.monthly_rent || 0,
                active: property.active !== undefined ? property.active : true,
            });
        } else {
            setFormData({
                address: '',
                rooms: 0,
                bathrooms: 0,
                garage_capacity: 0,
                year_built: 0,
                monthly_rent: 0,
                active: true,
            });
        }
    }, [isEditing, property]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleNumberChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    const handleClose = () => {
        setShowDialog(false);
    };

    return (
        <Dialog
            visible={showDialog}
            style={{ width: '450px', borderRadius: '8px', color: '#000000', backgroundColor: '#e6e6e6aa', padding: '20px' }}
            header={isEditing ? 'Actualizar Propiedad' : 'Agregar Propiedad'}
            modal
            className="p-fluid property-form"
            onHide={handleClose}
        >
            <div className="field">
                <label htmlFor="address">Dirección</label>
                <InputText
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    autoFocus
                />
            </div>

            <div className="field">
                <label htmlFor="monthly_rent">Alquiler Mensual</label>
                <InputNumber
                    id="monthly_rent"
                    name="monthly_rent"
                    value={formData.monthly_rent}
                    onValueChange={(e) => handleNumberChange('monthly_rent', e.value)}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                />
            </div>

            <div className="field">
                <label htmlFor="rooms">Habitaciones</label>
                <InputNumber
                    id="rooms"
                    name="rooms"
                    value={formData.rooms}
                    onValueChange={(e) => handleNumberChange('rooms', e.value)}
                    integeronly
                />
            </div>

            <div className="field">
                <label htmlFor="bathrooms">Baños</label>
                <InputNumber
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onValueChange={(e) => handleNumberChange('bathrooms', e.value)}
                    integeronly
                />
            </div>

            <div className="field">
                <label htmlFor="garage_capacity">Capacidad del Garage</label>
                <InputNumber
                    id="garage_capacity"
                    name="garage_capacity"
                    value={formData.garage_capacity}
                    onValueChange={(e) => handleNumberChange('garage_capacity', e.value)}
                    integeronly
                />
            </div>

            <div className="field">
                <label htmlFor="year_built">Año de Construcción</label>
                <InputNumber
                    id="year_built"
                    name="year_built"
                    value={formData.year_built}
                    onValueChange={(e) => handleNumberChange('year_built', e.value)}
                    integeronly
                />
            </div>

            <div className="field-checkbox">
                <Checkbox
                    inputId="active"
                    name="active"
                    checked={formData.active}
                    onChange={(e) => handleChange({ target: { name: 'active', value: e.checked, type: 'checkbox' } })}
                />
                <label htmlFor="active">Activo</label>
            </div>

            <div className="field">
                <Button type="button" label="Guardar" className="mt-2" onClick={handleSubmit} />
            </div>
        </Dialog>
    );
};

export default PropertyForm;
