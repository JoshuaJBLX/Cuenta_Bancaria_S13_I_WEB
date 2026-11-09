import React from 'react';

export const Navbar = ({ cuentas, cuentaActivaId, onCambiarCuenta }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b-2 border-[#333333]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-[#FFFFFF] font-bold text-xl uppercase tracking-wider">SISTEMA BANCARIO</span>
            <span className="text-[#00FF00] text-xs uppercase">v1.0</span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={cuentaActivaId}
              onChange={(e) => onCambiarCuenta(e.target.value)}
              className="bg-[#000000] border-2 border-[#00FF00] text-[#00FF00] px-3 py-2 font-mono text-sm focus:outline-none focus:bg-[#00FF00] focus:text-[#000000] w-full sm:w-auto"
            >
              <option value="">-- CUENTA --</option>
              {cuentas.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.numeroCuenta} - {c.titular}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};