import React from 'react';

const sufijo = (n) => (n === 1 ? '' : 's');

const badgeColor = (tipo) => {
  switch (tipo) {
    case 'deposito': return 'bg-[#00FF00] text-[#000000]';
    case 'retiro': return 'bg-[#FF0000] text-[#000000]';
    case 'transferencia': return 'bg-[#FFFFFF] text-[#000000]';
    default: return 'bg-[#333333] text-[#FFFFFF]';
  }
};

export const HistorialTransacciones = ({ transacciones, loading }) => {
  if (loading) {
    return (
      <div className="bg-[#222222] border-2 border-[#333333] p-6 text-[#00FF00] animate-pulse">
        CARGANDO HISTORIAL...
      </div>
    );
  }

  return (
    <div className="bg-[#222222] border-2 border-[#333333] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#FFFFFF] uppercase tracking-wider">HISTORIAL DE TRANSACCIONES</h3>
        <span className="text-[#A1A1AA] text-xs uppercase">{transacciones.length} registro{sufijo(transacciones.length)}</span>
      </div>

      {transacciones.length === 0 ? (
        <p className="text-[#00FF00] text-xs uppercase">SIN TRANSACCIONES REGISTRADAS</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#000000] text-[#FFFFFF] uppercase border-b-2 border-[#333333]">
              <th className="p-3 text-xs">FECHA</th>
              <th className="p-3 text-xs">TIPO</th>
              <th className="p-3 text-xs">MONTO</th>
              <th className="p-3 text-xs">DESCRIPCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((t) => (
              <tr key={t._id} className="border-b-2 border-[#333333] hover:bg-[#000000]">
                <td className="p-3 text-[#00FF00] text-xs">{new Date(t.createdAt).toLocaleString()}</td>
                <td className="p-3 text-xs">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase ${badgeColor(t.tipo)}`}>
                    {t.tipo}
                  </span>
                </td>
                <td className={`p-3 text-xs font-bold ${t.tipo === 'deposito' ? 'text-[#00FF00]' : 'text-[#FF0000]'}`}>
                  {t.tipo === 'deposito' ? '+' : '-'}${t.monto.toLocaleString()}
                </td>
                <td className="p-3 text-[#A1A1AA] text-xs">{t.descripcion || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};