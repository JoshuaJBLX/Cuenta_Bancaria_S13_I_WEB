import React from 'react';

export const SaldoCard = ({ cuenta, loading }) => {
  if (loading) {
    return (
      <div className="bg-neutral-900 border-2 border-neutral-700 p-5 text-green-500 animate-pulse">
        CARGANDO SALDO...
      </div>
    );
  }
  if (!cuenta) {
    return (
      <div className="bg-neutral-900 border-2 border-neutral-700 p-5 text-green-500">
        CUENTA NO SELECCIONADA
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border-4 border-green-500 p-5">
      <h2 className="text-xl font-bold text-white mb-2">SALDO DISPONIBLE</h2>
      <p className="text-4xl font-bold text-green-500">${cuenta.saldo.toLocaleString()}</p>
      <p className="text-green-500">{cuenta.numeroCuenta} - {cuenta.titular}</p>
      <p className="text-green-500">Moneda: {cuenta.moneda}</p>
    </div>
  );
};