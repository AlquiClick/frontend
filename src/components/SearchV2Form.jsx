import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useNavigate } from "react-router-dom";

const SearchContainer = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState('');

    const token = JSON.parse(localStorage.getItem('token'));
    const getProperties = async () => {
        const response = await fetch('http://127.0.0.1:5000/publications', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const properties = await response.json();
            setProperties(Array.isArray(properties) ? properties : []);
            console.log(properties);
        } else {
            console.error("Error fetching properties:", response.status);
        }
    };

    const test = () => {
        navigate('/property-edit');
    };

    useEffect(() => {
        getProperties();
    }, []);

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff' // Fondo uniforme
        }}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                maxHeight: '85vh',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                overflowY: 'auto',
                padding: '1.5rem',
                textAlign: 'left',
                boxShadow: 'none'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Mis propiedades</h2>

                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        <span style={{ position: 'absolute', left: '7%', color: '#888' }}>
                            <i className="pi pi-search" />
                        </span>
                        <InputText
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '90%',
                                paddingLeft: '2.5rem',
                                padding: '0.85rem',
                                borderRadius: '25px',
                                border: '1px solid #000000',
                                backgroundColor: '#ffffff',
                                marginLeft: '0.7rem'
                            }}
                        />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    overflowY: 'auto',
                    paddingRight: '10px'
                }}>
                    {filteredProperties.map((property) => (
                        <Card
                            key={property.id}
                            style={{
                                color: '#333',
                                borderRadius: '10px',
                                padding: '0',
                                boxShadow: 'none',
                                margin: '0 1rem',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: 'auto'
                            }}
                            onClick={() => test()}
                        >
                            <div style={{
                                flex: '6',
                                padding: '1rem',
                                backgroundColor: '#D8E7FD',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem',
                                    alignItems: 'center'
                                }}>
                                    <Tag
                                        value={`Dirección #${property.property_id}`}
                                        style={{
                                            backgroundColor: '#3B82F6',
                                            color: '#FFF',
                                            borderRadius: '5px',
                                            fontWeight: 'bold',
                                            fontSize: '0.6rem',
                                            padding: '0.3rem 0.5rem',
                                            minWidth: '10%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    />
                                    <Tag
                                        value={`$${property.price_shown}`}
                                        style={{
                                            backgroundColor: '#3B82F6',
                                            color: '#FFF',
                                            borderRadius: '5px',
                                            fontWeight: 'bold',
                                            fontSize: '0.6rem',
                                            padding: '0.3rem 0.5rem',
                                            minWidth: '5%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    />
                                </div>
                                <img
                                    alt="Property"
                                    src={property.image?.url || "https://primefaces.org/cdn/primereact/images/usercard.png"}
                                    style={{
                                        width: '100%',
                                        marginBottom: '20%',
                                        borderRadius: '5px'
                                    }}
                                />
                            </div>

                            <div style={{
                                flex: '4',
                                padding: '1rem',
                                backgroundColor: '#F8F9FE',
                                fontSize: '0.9rem',
                                textAlign: 'center'
                            }}>
                                <h5 style={{ fontWeight: 'bold', margin: 0, fontSize: '1rem', textAlign: 'left' }}>{property.title}</h5>
                                <p style={{ color: '#555', marginBottom: '1rem', fontSize: '0.85rem' }}>
                                    {property.description || 'Descripción no disponible'}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchContainer;
