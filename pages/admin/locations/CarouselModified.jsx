import React, { useState, useEffect } from 'react'
import styles from '../../../styles/Carousel.module.scss'
import Modal from '../../../components/Modal';
import axios from 'axios';

const options = [
    { label: "Usos Mulitiples", id: "Usos_Multiples", piso: "Planta Baja", lugar: 1 },
    { label: "Ciber Batiz", id: "Ciber_Batiz", piso: "Planta Baja", lugar: 1 },
    { label: "Salon 24", id: "Salon_24", piso: "Piso 01", lugar: 2 },
    { label: "Salon 22", id: "Salon_22", piso: "Piso 01", lugar: 2 },
    { label: "Laboratorio Nuevas Tecnologias", id: "LNT", piso: "Piso 02", lugar: 3 },
    { label: "Laboratorio 1 de Fisica", id: "Lab_Fis_01", piso: "Piso 03", lugar: 4 },
];

const Carousel = ({ sr, sv, onCambio,id_est }) => {
    const [svgCode, setSvgCode] = useState(sv);

    const handleClick = (event) => {
        const clickedElement = event.target;
        openModal();
        console.log(clickedElement);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ConfigForm id_est={id_est} />
                </Modal>
            </div>
            <div className={styles.edi} >
                <img src={sr} className={styles.edi2} />
                <div dangerouslySetInnerHTML={{ __html: svgCode }} className={styles.edi4} onClick={handleClick} id='map' />
            </div>
        </>
    )
}
const ConfigForm = ({id_est}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        // Aquí puedes realizar las acciones correspondientes según la opción seleccionada
        console.log('Opción seleccionada:', selectedOption);
        switch(selectedOption){
            case "addBuilding":
                const {data}=await axios.post("/api/handlers/addSpace",{
                    esp_nombre:event.target.esp_nombre.value,
                    id_est:id_est
                });
                if(data.status=="ok"){
                    console.log(data.result);
                }
                break;
            case "addNode":
                console.log("hola");
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="radio"
                    id="addBuilding"
                    value="addBuilding"
                    checked={selectedOption === 'addBuilding'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="addBuilding">Agregar edificio/sección</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="addNode"
                    value="addNode"
                    checked={selectedOption === 'addNode'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="addNode">Agregar nodo al catálogo</label>
            </div>
            {selectedOption == "addBuilding" ? (
                <>
                    <h1>Agregar Edificio/seccion</h1>
                    <table >
                        <tbody>
                            <th>
                                Nombre
                            </th>
                            <td>
                                <input name="esp_nombre"></input>
                            </td>
                        </tbody>
                    </table>                    
                </>
            ) : selectedOption == "addNode" ? (
                <>
                    <h1>Agregar Nodo</h1>
                </>
            ):(
                <></>
            )}
            <button type="submit">Guardar</button>
        </form>
    );
};


export default Carousel