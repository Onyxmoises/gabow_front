import React, { useState } from 'react';

const InteractiveDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenDialog}>Abrir diálogo</button>
      {isOpen && (
        <dialog open>
          <p>Contenido del diálogo</p>
          <button onClick={handleCloseDialog}>Cerrar diálogo</button>
        </dialog>
      )}
    </div>
  );
};

export default InteractiveDialog;
