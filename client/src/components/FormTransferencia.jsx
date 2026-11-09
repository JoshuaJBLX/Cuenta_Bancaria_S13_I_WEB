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
    <form onSubmit={handleSubmit} className="bg-neutral-900 border-2 border-neutral-700 p-5 space-y-4">
      <h3 className="text-lg font-bold text-white uppercase">TRANSFERENCIA</h3>
      <label className="text-green-500">Cuenta Origen:</label>
      <p className="text-green-500">{cuentaOrigenId ? 'Cuenta activa seleccionada' : 'Ninguna'}</p>
      <label className="text-green-500">Cuenta Destino:</label>
      <select
        value={cuentaDestinoId}
        onChange={(e) => setCuentaDestinoId(e.target.value)}
        className="bg-black border-2 border-green-500 text-green-500 px-3 py-2 w-full font-mono focus:outline-none focus:bg-green-500 focus:text-black"
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
      <label className="text-green-500">Monto:</label>
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="bg-black border-2 border-green-500 text-green-500 px-3 py-2 w-full focus:outline-none focus:bg-green-500 focus:text-black font-mono"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-black font-bold uppercase py-2 px-4 border-2 border-green-500 hover:bg-black hover:text-green-500 w-full"
      >
        {loading ? 'PROCESANDO...' : 'TRANSFERIR'}
      </button>
    </form>
  );
};