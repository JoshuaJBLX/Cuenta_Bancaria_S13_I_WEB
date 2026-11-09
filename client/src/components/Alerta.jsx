import React from 'react';

export const Alerta = ({ tipo, mensaje, onClose }) => {
  const isExito = tipo === 'exito';
  return (
    <div className={`p-3 font-bold border-2 ${isExito ? 'bg-green-500 text-black border-green-500' : 'bg-red-500 text-black border-red-500'}`}>
      {mensaje}
      <button
        onClick={onClose}
        className="ml-4 font-bold"
      >
        CERRAR
      </button>
    </div>
  );
};