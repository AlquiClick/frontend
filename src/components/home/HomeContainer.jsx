import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import HeaderContainer from '../header/HeaderContainer';
import FooterContainer from '../footer/FooterContainer';
import '../../styles/home.css';

const HomeContainer = () => {
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState('');

    const token = JSON.parse(localStorage.getItem('token'))
    const getProperties = async (values) => {
        const response = await fetch('http://127.0.0.1:5000/properties', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const properties = await response.json();
            setProperties(Array.isArray(properties) ? properties : properties.data || []);
            console.log(data.data);
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
                            subTitle={property.address}
                            footer={footer}
                            header={header}
                            style={{ backgroundColor: '#E8E9F1', color: '#333', borderRadius: '5%'}}
                        >
                            <p className="md:w-25rem">
                                {property.description}
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
