import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';
import { FaBookmark } from 'react-icons/fa';
import '../styles/search.css';

const SearchContainer = () => {
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
            console.error("Error fetching properties:", response.status)
        }
    };

    useEffect(() => {
        getProperties();
    }, []);

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(search.toLowerCase())
    );

    const carouselItemTemplate = (property) => (
        <div style={{ padding: '1rem', width: '250px' }}>
            <Card
                header={<img alt="Property" src={property.image?.url || "https://primefaces.org/cdn/primereact/images/usercard.png"} style={{ width: '100%', borderRadius: '5px' }} />}
                style={{
                    backgroundColor: '#E8E9F1',
                    color: '#333',
                    borderRadius: '10px',
                    padding: '1rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <FaBookmark style={{ position: 'absolute', top: '10px', right: '10px', color: property.isBookmarked ? '#4CAF50' : '#CCC', cursor: 'pointer' }} />

                <div style={{ paddingTop: '1rem' }}>
                    <h5 style={{ fontWeight: 'bold' }}>{property.title}</h5>
                    <p style={{ color: '#555', marginBottom: '1rem' }}>
                        {property.description || 'Descripción no disponible'}
                    </p>
                    <Tag value={`$${property.price_shown}`} style={{ backgroundColor: '#060A74', color: '#FFF' }} />
                </div>
            </Card>
        </div>
    );

    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            <div style={{
                width: '90%',
                maxWidth: '50%',
                maxHeight: '70%',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                overflowY: 'auto',
                padding: '1.5rem',
                margin: 'auto'
            }}>
                <Carousel
                    value={filteredProperties.slice(0, 3)}
                    itemTemplate={carouselItemTemplate}
                    numVisible={1}
                    numScroll={1}
                    style={{ marginBottom: '2rem' }}
                />

                <div className="search-bar" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <InputText
                        type="text"
                        placeholder="Buscar por título"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '50px',
                            marginRight: '10px'
                        }}
                    />
                    <Button icon="pi pi-search" className="p-button-rounded" />
                </div>

                <div
                    className="card-container"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        paddingRight: '10px'
                    }}
                >
                    {filteredProperties.map((property) => (
                        <Card
                            key={property.id}
                            header={<img alt="Property" src={property.image?.url || "https://primefaces.org/cdn/primereact/images/usercard.png"} style={{ width: '100%', borderRadius: '5px' }} />}
                            style={{
                                backgroundColor: '#E8E9F1',
                                color: '#333',
                                borderRadius: '10px',
                                padding: '1rem',
                                position: 'relative',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                margin: '0 1rem'
                            }}
                        >
                            <FaBookmark style={{ position: 'absolute', top: '10px', right: '10px', color: property.isBookmarked ? '#4CAF50' : '#CCC', cursor: 'pointer' }} />

                            <div style={{ paddingTop: '1rem' }}>
                                <h5 style={{ fontWeight: 'bold' }}>{property.title}</h5>
                                <p style={{ color: '#555', marginBottom: '1rem' }}>
                                    {property.description || 'Descripción no disponible'}
                                </p>
                                <Tag value={`$${property.price_shown}`} style={{ backgroundColor: '#060A74', color: '#FFF' }} />
                            </div>

                            <Button
                                label="Ver más"
                                icon="pi pi-angle-right"
                                style={{
                                    marginTop: '1rem',
                                    width: '100%',
                                    backgroundColor: '#060A74',
                                    color: '#FFF',
                                    borderRadius: '5px'
                                }}
                            />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchContainer;
