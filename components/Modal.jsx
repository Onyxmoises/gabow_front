import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    };

    const contentStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '4px',
        width: '400px',
        marginBottom: '10px',
        color: '#fff' // Ajusta el color del texto dentro del modal
    };

    const closeButtonStyle = {
        backgroundColor: '#ccc',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div style={modalStyle}>
            <div style={contentStyle}>
                <div>{children}</div>
                <br></br>
                <hr></hr>
                <button style={closeButtonStyle} onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
