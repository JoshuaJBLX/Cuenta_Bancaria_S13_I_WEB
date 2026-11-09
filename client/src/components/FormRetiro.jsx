import React from 'react';

export const FormRetiro = ({ onSubmit, loading, saldoDisponible }) => {
  const [monto, setMonto] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const m = parseFloat(monto);
    onSubmit({ monto: m });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#222222] border-2 border-[#333333] p-6 space-y-5">
      <div className="flex items-center gap-2">
        <span className="bg-[#00FF00] text-[#000000] px-2 py-1 text-[10px] font-bold uppercase">RETIRO</span>
        <h3 className="text-lg font-bold text-[#FFFFFF] uppercase">Retirar efectivo</h3>
      </div>
      <label className="block text-[#A1A1AA] text-xs uppercase">Monto a retirar</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00FF00]">$</span>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="bg-[#000000] border-2 border-[#00FF00] text-[#00FF00] px-10 py-3 w-full font-mono focus:outline-none focus:bg-[#00FF00] focus:text-[#000000]"
          required
        />
      </div>
      <p className="text-[#A1A1AA] text-xs uppercase">Saldo disponible: ${saldoDisponible?.toLocaleString() ?? 0}</p>
      <button
        type="submit"
        disabled={loading}
        className="bg-[#00FF00] text-[#000000] font-bold uppercase py-3 px-6 border-2 border-[#00FF00] hover:bg-[#000000] hover:text-[#00FF00] w-full"
      >
        {loading ? 'PROCESANDO...' : 'RETIRAR'}
      </button>
    </form>
  );
};