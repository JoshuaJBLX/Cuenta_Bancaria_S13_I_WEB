import React from 'react';

export const HistorialTransacciones = ({ transacciones, loading }) => {
  if (loading) {
    return (
      <div className="text-green-500 animate-pulse uppercase">
        CARGANDO HISTORIAL...
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border-2 border-neutral-700 p-5">
      <h3 className="text-lg font-bold text-white uppercase mb-4">HISTORIAL DE TRANSACCIONES</h3>
      {transacciones.length === 0 ? (
        <p className="text-green-500">SIN TRANSACCIONES</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-800 text-white uppercase">
              <th className="p-2 border-b-2 border-neutral-800">FECHA</th>
              <th className="p-2 border-b-2 border-neutral-800">TIPO</th>
              <th className="p-2 border-b-2 border-neutral-800">MONTO</th>
              <th className="p-2 border-b-2 border-neutral-800">DESCRIPCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((t) => (
              <tr key={t._id} className="border-b-2 border-neutral-800">
                <td className="p-2 text-green-500">{new Date(t.createdAt).toLocaleString()}</td>
                <td className="p-2 text-green-500 uppercase">{t.tipo}</td>
                <td className={`p-2 ${t.tipo === 'deposito' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.tipo === 'deposito' ? '+' : '-'}${t.monto.toLocaleString()}
                </td>
                <td className="p-2 text-green-500">{t.descripcion || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};