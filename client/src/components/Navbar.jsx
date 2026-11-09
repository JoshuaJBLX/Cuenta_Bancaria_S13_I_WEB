import React from 'react';

export const Navbar = ({ cuentas, cuentaActivaId, onCambiarCuenta }) => {
  return (
    <nav className="bg-neutral-900 border-2 border-neutral-700 p-4 mb-6">
      <h1 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">SISTEMA BANCARIO v1.0</h1>
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={cuentaActivaId}
          onChange={(e) => onCambiarCuenta(e.target.value)}
          className="bg-black border-2 border-green-500 text-green-500 px-3 py-2 font-mono w-full sm:w-auto"
        >
          <option value="">-- SELECCIONAR CUENTA --</option>
          {cuentas.map((c) => (
            <option key={c._id} value={c._id}>
              {c.numeroCuenta} - {c.titular} ($${c.saldo})
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};