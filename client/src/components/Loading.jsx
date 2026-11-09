import React from 'react';

export const Loading = ({ mensaje }) => {
  return (
    <div className="text-[#00FF00] animate-pulse uppercase font-bold">
      {mensaje || 'CARGANDO...'}
    </div>
  );
};