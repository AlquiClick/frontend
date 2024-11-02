import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import HeaderContainer from '../header/HeaderContainer';
import FooterContainer from '../footer/FooterContainer';
import '../../styles/home.css';

const HomeContainer = () => {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState('');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMDU3Njg4NiwianRpIjoiNjJhNDBkNjgtNmUxOS00OWI0LThjYmQtYzE0Mjk5MjVmNGNmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImdlcmNobyIsIm5iZiI6MTczMDU3Njg4NiwiY3NyZiI6IjRmZTAxMjY1LTg3MmYtNDJhZi04Mzk3LWY2YTM0NjY2ZjA2OCIsImV4cCI6MTczNjU3Njg4NiwiaXNfYWRtaW4iOnRydWV9.RPEYfFHACk1uLgteRGI4v9QBD-0Ham5qfyPzj4cOv2E';
    const getProperties = async (values) => {
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

    useEffect(() => {
        getProperties();
    }, []);

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(search.toLowerCase())
    );

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
            <Button
                label="Ver mas"
                icon="pi pi-check"
                style={{ width: '50%', backgroundColor: '#060A74' }}
            />
        </>
    );

    return (
        <>
            <HeaderContainer />
            <div style={{ marginTop: '20%', width: '100%'}}>
                <input
                    type="text"
                    placeholder="Buscar por título"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '100%', marginBottom: '1rem' }}
                />

                <div className="card-container">
                    {filteredProperties.map((property) => (
                        <Card
                            key={property.id}
                            title={property.title}
                            footer={footer}
                            header={<img alt="Property" src={property.image?.url || "https://primefaces.org/cdn/primereact/images/usercard.png"} />}
                            style={{ backgroundColor: '#E8E9F1', color: '#333', borderRadius: '5%'}}
                        >
                            <p className="md:w-25rem">
                                {property.description}
                            </p>

                            <p className="md:w-25rem">
                                {property.price_shown}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            <FooterContainer />
        </>
    );
};

export default HomeContainer;
