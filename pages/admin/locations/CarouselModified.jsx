import React, { useState, useEffect } from 'react'

import styles from '../../../styles/Carousel.module.scss'

import Modal from '../../../components/Modal';
const options = [
    { label: "Usos Mulitiples", id: "Usos_Multiples", piso: "Planta Baja", lugar: 1 },
    { label: "Ciber Batiz", id: "Ciber_Batiz", piso: "Planta Baja", lugar: 1 },
    { label: "Salon 24", id: "Salon_24", piso: "Piso 01", lugar: 2 },
    { label: "Salon 22", id: "Salon_22", piso: "Piso 01", lugar: 2 },
    { label: "Laboratorio Nuevas Tecnologias", id: "LNT", piso: "Piso 02", lugar: 3 },
    { label: "Laboratorio 1 de Fisica", id: "Lab_Fis_01", piso: "Piso 03", lugar: 4 },
];

const Carousel = ({ sr, sv, onCambio }) => {
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
                <h1>My Next.js App</h1>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h1>Agregar Edificio</h1>
                    <table border={1} style={{ textAlign: "center" }}>
                        <tbody>
                            <th>Nombre</th>
                            <td>
                                <input></input>
                            </td>
                        </tbody>
                    </table>
                </Modal>
            </div>
            <div className={styles.edi} >
                <img src={sr} className={styles.edi2} />
                <div dangerouslySetInnerHTML={{ __html: svgCode }} className={styles.edi4} onClick={handleClick} id='map' />
            </div>
        </>
    )
}

export default Carousel