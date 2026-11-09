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
    <div className="min-h-screen bg-[#000000] text-[#00FF00] font-mono">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(0,255,0,0.04) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(0,255,0,0.04) 0%, transparent 40%)'
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

      <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">

        <section id="hero" className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#00FF00] text-[#000000] px-2 py-1 text-[10px] font-bold uppercase">ENERGÍA SIN LÍMITES</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#FFFFFF] uppercase tracking-wider mb-6 border-b-4 border-[#00FF00] pb-3">
            GESTIÓN BANCARIA<span className="animate-pulse"> █</span>
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg mb-8 max-w-md">
            Sistema de gestión de cuenta bancaria simplificada. Operá depósitos, retiros y transferencias con control total de tu saldo en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#00FF00] text-[#000000] font-bold uppercase py-3 px-6 border-2 border-[#00FF00] hover:bg-[#000000] hover:text-[#00FF00]">
              VER CUENTAS
            </button>
            <button className="border-2 border-[#00FF00] text-[#00FF00] font-bold uppercase py-3 px-6 hover:bg-[#00FF00] hover:text-[#000000]">
              NUEVA OPERACIÓN
            </button>
          </div>
        </section>

        <section id="productos" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#FFFFFF] uppercase tracking-wider">TUS CUENTAS</h2>
              <p className="text-[#A1A1AA] text-sm uppercase">Seleccioná una cuenta para operar</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuentas.map((c) => (
              <div
                key={c._id}
                onClick={() => {
                  setCuentaId(c._id);
                  setCuenta(null);
                  setTransacciones([]);
                }}
                className={`bg-[#222222] border-2 ${cuentaId === c._id ? 'border-[#00FF00]' : 'border-[#333333]'} p-6 cursor-pointer hover:border-[#00FF00]`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[#00FF00] font-bold text-xl">{c.numeroCuenta}</span>
                  <span className="text-[#A1A1AA] text-xs uppercase">{c.moneda}</span>
                </div>
                <p className="text-[#FFFFFF] font-bold text-lg mb-2">{c.titular}</p>
                <p className="text-3xl font-bold text-[#00FF00]">${c.saldo.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        <aside className="space-y-6">
          <div className="bg-[#222222] border-2 border-[#333333] p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] uppercase mb-4">CUENTA ACTIVA</h3>
            {cuenta ? (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[#A1A1AA] text-xs uppercase">Titular</p>
                  <p className="text-[#FFFFFF] font-bold">{cuenta.titular}</p>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[#A1A1AA] text-xs uppercase">Número</p>
                  <p className="text-[#00FF00] font-bold">{cuenta.numeroCuenta}</p>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[#A1A1AA] text-xs uppercase">Moneda</p>
                  <p className="text-[#00FF00] font-bold">{cuenta.moneda}</p>
                </div>
                <div className="pt-3 border-t-2 border-[#333333]">
                  <p className="text-[#A1A1AA] text-xs uppercase">Saldo actual</p>
                  <p className="text-4xl font-bold text-[#00FF00]">${cuenta.saldo.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <p className="text-[#00FF00] text-xs uppercase">Seleccioná una cuenta</p>
            )}
          </div>

          <div className="bg-[#222222] border-2 border-[#333333] p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] uppercase mb-4">ESTADÍSTICAS</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#000000] border-2 border-[#333333] text-center">
                <p className="text-[#A1A1AA] text-[10px] uppercase">Total cuentas</p>
                <p className="text-[#FFFFFF] font-bold text-lg">{cuentas.length}</p>
              </div>
              <div className="p-3 bg-[#000000] border-2 border-[#333333] text-center">
                <p className="text-[#A1A1AA] text-[10px] uppercase">Transacciones</p>
                <p className="text-[#00FF00] font-bold text-lg">{transacciones.length}</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <section id="contacto" className="mt-16 border-t-2 border-[#333333] pt-8">
        <div className="bg-[#222222] border-2 border-[#333333] p-6 text-center">
          <h3 className="text-lg font-bold text-[#FFFFFF] uppercase mb-2">Contacto</h3>
          <p className="text-[#A1A1AA] text-xs uppercase mb-4">Ingeniería Web · Sistema Bancario v1.0</p>
          <div className="flex justify-center gap-6 text-xs text-[#A1A1AA] uppercase">
            <span>WhatsApp</span>
            <span>Redes</span>
            <span>Horario</span>
          </div>
        </div>
      </section>

      </div>

      <footer className="text-[#666666] text-xs border-t-2 border-[#333333] pt-4 mt-12">
        SISTEMA BANCARIO v1.0 · INGENIERÍA WEB
      </footer>
    </div>
  );
};

export default App;