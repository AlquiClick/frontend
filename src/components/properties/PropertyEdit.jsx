import React from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';
import '../../styles/properties.css'

const PropertyEdit = () => {
    const navigate = useNavigate();

    const goToEditSection = (path) => {
        navigate(path);
    };

    return (
        <div className="property-edit-container">
            <div style={{ backgroundColor:'#D8E7FD', height: '350px', overflowX: 'hidden', display: 'flex', alignItems: 'center'}}>
                <Image
                    className="flex md:hidden" align="center"
                    src="https://www.lanacion.com.ar/resizer/v2/la-casa-austral-gano-un-premio-internacional-como-RF74XA7U2BAW3MANZMC3WXVOYU.JPG?auth=908de4664be6f87d9a4910b8a8b6e7e5451087edec90c7dfbeef3e3e6772ce79&width=880&height=586&quality=70&smart=true"
                    alt="Image"
                    width="100%"
                />
            </div>
            <div className="edit-options">
                <Button label="Modificar fotos" className="edit-button" icon="pi pi-angle-right" iconPos="right" onClick={() => goToEditSection('/edit-photos')} />
                <Button label="Precio de alquiler" className="edit-button" icon="pi pi-angle-right" iconPos="right" onClick={() => goToEditSection('/edit-price')} />
                <Button label="Dirección" className="edit-button" icon="pi pi-angle-right" iconPos="right" onClick={() => goToEditSection('/edit-address')} />
                <Button label="Detalles extra" className="edit-button" icon="pi pi-angle-right" iconPos="right" onClick={() => goToEditSection('/edit-details')} />
            </div>
        </div>
    );
};

export default PropertyEdit;
