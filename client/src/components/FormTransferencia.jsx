import React from 'react';

export const FormTransferencia = ({ onSubmit, loading, cuentasDisponibles, cuentaOrigenId }) => {
  const [monto, setMonto] = React.useState('');
  const [cuentaDestinoId, setCuentaDestinoId] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const m = parseFloat(monto);
    onSubmit({ cuentaDestinoId, monto: m });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#222222] border-2 border-[#333333] p-6 space-y-5">
      <div className="flex items-center gap-2">
        <span className="bg-[#00FF00] text-[#000000] px-2 py-1 text-[10px] font-bold uppercase">TRANSFERENCIA</span>
        <h3 className="text-lg font-bold text-[#FFFFFF] uppercase">Transferir entre cuentas</h3>
      </div>
      <label className="block text-[#A1A1AA] text-xs uppercase">Cuenta Origen</label>
      <p className="text-[#00FF00] text-sm">{cuentaOrigenId ? 'Cuenta activa seleccionada' : 'Ninguna'}</p>
      <label className="block text-[#A1A1AA] text-xs uppercase">Cuenta Destino</label>
      <select
        value={cuentaDestinoId}
        onChange={(e) => setCuentaDestinoId(e.target.value)}
        className="bg-[#000000] border-2 border-[#00FF00] text-[#00FF00] px-3 py-2 w-full font-mono focus:outline-none focus:bg-[#00FF00] focus:text-[#000000]"
      >
        <option value="">-- SELECCIONAR DESTINO --</option>
        {cuentasDisponibles
          .filter((c) => c._id !== cuentaOrigenId)
          .map((c) => (
            <option key={c._id} value={c._id}>
              {c.numeroCuenta} - {c.titular}
            </option>
          ))}
      </select>
      <label className="block text-[#A1A1AA] text-xs uppercase">Monto a transferir</label>
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
      <button
        type="submit"
        disabled={loading}
        className="bg-[#00FF00] text-[#000000] font-bold uppercase py-3 px-6 border-2 border-[#00FF00] hover:bg-[#000000] hover:text-[#00FF00] w-full"
      >
        {loading ? 'PROCESANDO...' : 'TRANSFERIR'}
      </button>
    </form>
  );
};