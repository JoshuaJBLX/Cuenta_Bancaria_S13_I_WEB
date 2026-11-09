import React, { useState, useEffect } from 'react';
import { api } from './services/api.js';
import { Navbar } from './components/Navbar.jsx';
import { SaldoCard } from './components/SaldoCard.jsx';
import { FormDeposito } from './components/FormDeposito.jsx';
import { FormRetiro } from './components/FormRetiro.jsx';
import { FormTransferencia } from './components/FormTransferencia.jsx';
import { HistorialTransacciones } from './components/HistorialTransacciones.jsx';
import { Alerta } from './components/Alerta.jsx';
import { Loading } from './components/Loading.jsx';

const MAP_ERROR = {
  400: 'Datos inválidos o saldo insuficiente.',
  404: 'Cuenta no encontrada.',
  500: 'Error interno del servidor.'
};

const App = () => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaId, setCuentaId] = useState('');
  const [cuenta, setCuenta] = useState(null);
  const [transacciones, setTransacciones] = useState([]);
  const [loadingCuenta, setLoadingCuenta] = useState(false);
  const [loadingOperacion, setLoadingOperacion] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const mostrarAlerta = (tipo, mensaje) => {
    setAlerta({ tipo, mensaje });
    setTimeout(() => setAlerta(null), 4000);
  };

  useEffect(() => {
    const cargarCuentas = async () => {
      try {
        const data = await api.get('/cuenta');
        setCuentas(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    cargarCuentas();
  }, []);

  useEffect(() => {
    if (!cuentaId) {
      setCuenta(null);
      setTransacciones([]);
      return;
    }
    const cargar = async () => {
      setLoadingCuenta(true);
      try {
        const [c, h] = await Promise.all([
          api.get(`/cuenta/${cuentaId}`),
          api.get(`/cuenta/${cuentaId}/historial`)
        ]);
        setCuenta(c.data);
        setTransacciones(h.data);
      } catch (error) {
        mostrarAlerta('error', MAP_ERROR[error.status] || 'Error al cargar cuenta');
      } finally {
        setLoadingCuenta(false);
      }
    };
    cargar();
  }, [cuentaId]);

  const recargarCuenta = async () => {
    const [c, h] = await Promise.all([
      api.get(`/cuenta/${cuentaId}`),
      api.get(`/cuenta/${cuentaId}/historial`)
    ]);
    setCuenta(c.data);
    setTransacciones(h.data);
  };

  const handleDeposito = async (data) => {
    setLoadingOperacion(true);
    try {
      await api.post('/cuenta/deposito', { cuentaId, monto: data.monto });
      mostrarAlerta('exito', 'Depósito realizado correctamente');
      await recargarCuenta();
    } catch (error) {
      mostrarAlerta('error', MAP_ERROR[error.status] || 'Error en depósito');
    } finally {
      setLoadingOperacion(false);
    }
  };

  const handleRetiro = async (data) => {
    setLoadingOperacion(true);
    try {
      await api.post('/cuenta/retiro', { cuentaId, monto: data.monto });
      mostrarAlerta('exito', 'Retiro realizado correctamente');
      await recargarCuenta();
    } catch (error) {
      mostrarAlerta('error', MAP_ERROR[error.status] || 'Error en retiro');
    } finally {
      setLoadingOperacion(false);
    }
  };

  const handleTransferencia = async (data) => {
    setLoadingOperacion(true);
    try {
      await api.post('/cuenta/transferencia', {
        cuentaOrigenId: cuentaId,
        cuentaDestinoId: data.cuentaDestinoId,
        monto: data.monto
      });
      mostrarAlerta('exito', 'Transferencia realizada correctamente');
      await recargarCuenta();
    } catch (error) {
      mostrarAlerta('error', MAP_ERROR[error.status] || 'Error en transferencia');
    } finally {
      setLoadingOperacion(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-10">
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,255,0,0.05) 0, rgba(0,255,0,0.05) 1px, transparent 1px, transparent 2px)'
        }}
      ></div>

      <Navbar
        cuentas={cuentas}
        cuentaActivaId={cuentaId}
        onCambiarCuenta={(id) => {
          setCuentaId(id);
          setCuenta(null);
          setTransacciones([]);
        }}
      />

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          onClose={() => setAlerta(null)}
        />
      )}

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <SaldoCard cuenta={cuenta} loading={loadingCuenta} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDeposito onSubmit={handleDeposito} loading={loadingOperacion} />
            <FormRetiro
              onSubmit={handleRetiro}
              loading={loadingOperacion}
              saldoDisponible={cuenta?.saldo}
            />
          </div>

          <FormTransferencia
            onSubmit={handleTransferencia}
            loading={loadingOperacion}
            cuentasDisponibles={cuentas}
            cuentaOrigenId={cuentaId}
          />

          <HistorialTransacciones
            transacciones={transacciones}
            loading={loadingCuenta}
          />
        </div>

        <aside className="space-y-4">
          <div className="bg-neutral-900 border-2 border-neutral-700 p-5">
            <h3 className="text-lg font-bold text-white uppercase mb-4">CUENTA ACTIVA</h3>
            {cuenta ? (
              <div className="space-y-2">
                <p className="text-green-500">Titular: {cuenta.titular}</p>
                <p className="text-green-500">Número: {cuenta.numeroCuenta}</p>
                <p className="text-green-500">Moneda: {cuenta.moneda}</p>
                <p className="text-3xl font-bold text-green-500">${cuenta.saldo.toLocaleString()}</p>
              </div>
            ) : (
              <p className="text-green-500">SELECCIONE UNA CUENTA</p>
            )}
          </div>
        </aside>
      </main>

      <footer className="text-neutral-600 text-xs border-t-2 border-neutral-800 pt-4 mt-10">
        SISTEMA BANCARIO v1.0 · INGENIERÍA WEB
      </footer>
    </div>
  );
};

export default App;