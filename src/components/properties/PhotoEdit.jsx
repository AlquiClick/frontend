import React, { useState } from 'react';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import 'primereact/resources/themes/fluent-light/theme.css';
import '../../styles/properties.css';

const PhotoEdit = () => {
    const [photos, setPhotos] = useState([
        { src: 'https://www.lanacion.com.ar/resizer/v2/la-casa-austral-gano-un-premio-internacional-como-RF74XA7U2BAW3MANZMC3WXVOYU.JPG?auth=908de4664be6f87d9a4910b8a8b6e7e5451087edec90c7dfbeef3e3e6772ce79&width=880&height=586&quality=70&smart=true', isMain: true },
        { src: 'https://www.portaldearquitectos.com/uploads/prop_properties/estudio-de-arquitectura-leone-loray-arquitectos-casa-austral-C-171-018-05.jpg', isMain: false },
        { src: 'https://www.casasparaconstruir.com/projetos/161/02.jpg', isMain: false },
        { src: 'https://blog.fincaraiz.com.co//wp-content/uploads/2022/08/casas-modernas-1-1920x1130.jpg', isMain: false },
        { src: 'https://gpvivienda.com/blog/wp-content/uploads/2023/03/ralph-ravi-kayden-mR1CIDduGLc-unsplash-1-1-1024x680.jpg', isMain: false },
        { src: 'https://img.freepik.com/vector-premium/dibujo-casa-azul-casa-azul-parte-superior_135595-98304.jpg?w=1380', isMain: false },
        { src: 'https://www.lanacion.com.ar/resizer/v2/la-casa-austral-gano-un-premio-internacional-como-RF74XA7U2BAW3MANZMC3WXVOYU.JPG?auth=908de4664be6f87d9a4910b8a8b6e7e5451087edec90c7dfbeef3e3e6772ce79&width=880&height=586&quality=70&smart=true', isMain: true },
        { src: 'https://www.portaldearquitectos.com/uploads/prop_properties/estudio-de-arquitectura-leone-loray-arquitectos-casa-austral-C-171-018-05.jpg', isMain: false },
        { src: 'https://www.casasparaconstruir.com/projetos/161/02.jpg', isMain: false },
        { src: 'https://blog.fincaraiz.com.co//wp-content/uploads/2022/08/casas-modernas-1-1920x1130.jpg', isMain: false },
    ]);

    const toast = useRef(null);

    const setMainPhoto = (index) => {
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo, i) => ({
                ...photo,
                isMain: i === index
            }))
        );
    };

    const handleSave = () => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Foto principal guardada', life: 3000 });
    };

    return (
        <div className="photo-edit-container">
            <Toast ref={toast} />
            {/* Mostrar la foto principal */}
            <div style={{ backgroundColor:'#D8E7FD', height: '350px', overflowX: 'hidden', display: 'flex', alignItems: 'center'}}>
                <Image
                    src={photos.find(photo => photo.isMain)?.src}
                    className="main-photo flex md:hidden"
                    align="center"
                    alt="Main Image"
                    width="100%"
                    height="100%"
                />
            </div>

            <div className="photo-grid">
                {photos.map((photo, index) => (
                    <Card key={index} className="photo-card">
                        <Image src={photo.src} alt="Image" width="100%" />
                        <RadioButton
                            inputId={`photo-${index}`}
                            name="mainPhoto"
                            value={index}
                            onChange={() => setMainPhoto(index)}
                            checked={photo.isMain}
                            className="photo-radio"
                        />
                    </Card>
                ))}
            </div>

            {/* Botón de Guardar */}
            <div className="save-button-container">
                <Button
                    label="Guardar"
                    icon="pi pi-check"
                    onClick={handleSave}
                    severity="success"
                />
            </div>
        </div>
    );
};

export default PhotoEdit;
