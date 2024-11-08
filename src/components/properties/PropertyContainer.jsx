import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import PropertyForm from './PropertyForm';
import HeaderContainer from '../header/HeaderContainer';
import '../../styles/home.css';

const PropertyContainer = () => {
    const [properties, setProperties] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMTAxODg3OSwianRpIjoiZmMyYjBmNjMtNGE4Ni00MWVhLWExMDEtNDNmNjE4MjMzZmNlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluIiwibmJmIjoxNzMxMDE4ODc5LCJjc3JmIjoiOTM1MTZiMjEtNmQ4OS00NzQyLWFmYTctMTZhZGE4M2RiMWRiIiwiZXhwIjoxNzM0MDE4ODc5LCJpc19hZG1pbiI6dHJ1ZX0.Q5maEorIlrPct8Glvg42_uXGQGryw88Q_3ky5wcLj_Y';

    const getProperties = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/property', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const properties = await response.json();
                setProperties(Array.isArray(properties) ? properties : []);
            } else {
                console.error('Error al obtener las propiedades:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getProperties();
    }, []);

    const handleDeactivate = async (id) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/property', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ property_id: id }),
            });

            if (response.ok) {
                setProperties(properties.map((property) =>
                    property.id === id ? { ...property, active: 0 } : property
                ));
                console.log(`Propiedad con ID ${id} desactivada exitosamente.`);
            } else {
                console.error('Error al desactivar la propiedad:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleActivate = async (id) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/property', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ property_id: id, active: 1 }),
            });

            if (response.ok) {
                setProperties(properties.map((property) =>
                    property.id === id ? { ...property, active: 1 } : property
                ));
                console.log(`Propiedad con ID ${id} activada exitosamente.`);
            } else {
                console.error('Error al activar la propiedad:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSaveProperty = async (data) => {
        try {
            console.log(data);
            data.property_id = isEditing ? selectedProperty.id : 0
            const method = isEditing ? 'PUT' : 'POST';
            const response = await fetch('http://127.0.0.1:5000/property', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log(`Propiedad ${isEditing ? 'actualizada' : 'agregada'} exitosamente.`);
                await getProperties();
                setShowDialog(false);
                setSelectedProperty(null);
                setIsEditing(false);
            } else {
                console.error(`Error al ${isEditing ? 'actualizar' : 'agregar'} la propiedad:`, response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const openNewPropertyDialog = () => {
        setSelectedProperty(null);
        setIsEditing(false);
        setShowDialog(true);
    };

    const openEditPropertyDialog = (property) => {
        setSelectedProperty(property);
        setIsEditing(true);
        setShowDialog(true);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    label="Actualizar"
                    icon="pi pi-pencil"
                    className="p-button-warning"
                    onClick={() => openEditPropertyDialog(rowData)}
                    style={{ marginRight: '0.5rem' }}
                />
                {rowData.active ? (
                    <Button
                        label="Desactivar"
                        icon="pi pi-times"
                        className="p-button-danger"
                        onClick={() => handleDeactivate(rowData.id)}
                    />
                ) : (
                    <Button
                        label="Activar"
                        icon="pi pi-check"
                        className="p-button-success"
                        onClick={() => handleActivate(rowData.id)}
                    />
                )}
            </>
        );
    };

    return (
        <>
            <HeaderContainer />
            <div style={{ marginTop: '2%', width: '100%' }}>
                <Button
                    label="Agregar"
                    icon="pi pi-plus"
                    style={{ marginBottom: '1rem', backgroundColor: '#28a745' }}
                    onClick={openNewPropertyDialog}
                />
                <DataTable
                    value={properties}
                    paginator
                    rows={15}
                    responsiveLayout="scroll"
                    style={{ color: '#000000' }}
                >
                    <Column field="address" header="Dirección" sortable></Column>
                    <Column
                        field="monthly_rent"
                        header="Alquiler mensual"
                        sortable
                        body={(data) => `$${data.monthly_rent}`}
                    ></Column>
                    <Column field="rooms" header="Habitaciones" sortable></Column>
                    <Column field="bathrooms" header="Baños" sortable></Column>
                    <Column
                        field="garage_capacity"
                        header="Garage"
                        sortable
                        body={(data) => `${data.garage_capacity} autos`}
                    ></Column>
                    <Column field="year_built" header="Año de construcción" sortable></Column>
                    <Column body={actionBodyTemplate} header="Acciones"></Column>
                </DataTable>

                <PropertyForm
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    onSave={handleSaveProperty}
                    property={selectedProperty}
                    isEditing={isEditing}
                />
            </div>
        </>
    );
};

export default PropertyContainer;
