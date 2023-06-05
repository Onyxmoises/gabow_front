import React, { useState } from 'react';
import Modal from '../../../components/Modal';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>My Next.js App</h1>
            <button onClick={openModal}>Abrir Modal</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Contenido del Modal</h2>
                <p>Este es un ejemplo de modal en Next.js.</p>
            </Modal>
        </div>
    );
};

export default HomePage;
