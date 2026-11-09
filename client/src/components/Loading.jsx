import React from 'react';

export const Loading = ({ mensaje }) => {
  return (
    <div className="text-green-500 animate-pulse uppercase">
      {mensaje || 'CARGANDO...'}
    </div>
  );
};