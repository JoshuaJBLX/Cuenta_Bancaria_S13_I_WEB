import React from 'react';

export const Alerta = ({ tipo, mensaje, onClose }) => {
  const isExito = tipo === 'exito';
  return (
    <div className={`p-4 font-bold border-2 ${isExito ? 'bg-[#00FF00] text-[#000000] border-[#00FF00]' : 'bg-[#FF0000] text-[#000000] border-[#FF0000]'}`}>
      <span className="uppercase">{mensaje}</span>
      <button
        onClick={onClose}
        className="ml-4 font-bold uppercase"
      >
        CERRAR
      </button>
    </div>
  );
};