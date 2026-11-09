import React from 'react';

export const SaldoCard = ({ cuenta, loading }) => {
  if (loading) {
    return (
      <div className="bg-[#222222] border-2 border-[#333333] p-6 text-[#00FF00] animate-pulse">
        CARGANDO SALDO...
      </div>
    );
  }
  if (!cuenta) {
    return (
      <div className="bg-[#222222] border-2 border-[#333333] p-6 text-[#00FF00]">
        CUENTA NO SELECCIONADA
      </div>
    );
  }

  return (
    <div className="bg-[#222222] border-4 border-[#00FF00] p-6 space-y-5">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#FFFFFF] uppercase tracking-wider">SALDO DISPONIBLE</h2>
          <p className="text-[#A1A1AA] text-xs uppercase">{cuenta.numeroCuenta} · {cuenta.titular}</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-bold text-[#00FF00]">${cuenta.saldo.toLocaleString()}</p>
          <p className="text-[#A1A1AA] text-xs uppercase">moneda: {cuenta.moneda}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t-2 border-[#333333] pt-4">
        <div className="p-3 bg-[#000000] border-2 border-[#333333]">
          <p className="text-[#A1A1AA] text-xs uppercase">Titular</p>
          <p className="text-[#FFFFFF] font-bold">{cuenta.titular}</p>
        </div>
        <div className="p-3 bg-[#000000] border-2 border-[#333333]">
          <p className="text-[#A1A1AA] text-xs uppercase">Número</p>
          <p className="text-[#00FF00] font-bold">{cuenta.numeroCuenta}</p>
        </div>
      </div>
    </div>
  );
};