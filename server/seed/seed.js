import mongoose from 'mongoose';
import Cuenta from '../models/Cuenta.js';
import Transaccion from '../models/Transaccion.js';

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cuenta_bancaria');

    await Cuenta.deleteMany({});
    await Transaccion.deleteMany({});

    const cuentas = await Cuenta.create([
      { numeroCuenta: 'CTA-001', titular: 'Bruce Wayne', saldo: 100000, moneda: 'USD' },
      { numeroCuenta: 'CTA-002', titular: 'Elliot Alderson', saldo: 50000, moneda: 'USD' },
      { numeroCuenta: 'CTA-003', titular: 'Ada Lovelace', saldo: 25000, moneda: 'USD' }
    ]);

    const [cta1, cta2, cta3] = cuentas;

    // 2 depósitos de ejemplo
    await Transaccion.create([
      { tipo: 'deposito', monto: 5000, cuentaOrigen: cta1._id, saldoResultanteOrigen: cta1.saldo + 5000, descripcion: 'Depósito inicial' },
      { tipo: 'deposito', monto: 3000, cuentaOrigen: cta2._id, saldoResultanteOrigen: cta2.saldo + 3000, descripcion: 'Depósito mensual' }
    ]);

    // 1 retiro de ejemplo
    await Transaccion.create([
      { tipo: 'retiro', monto: 2000, cuentaOrigen: cta3._id, saldoResultanteOrigen: cta3.saldo - 2000, descripcion: 'Retiro en efectivo' }
    ]);

    // 1 transferencia de ejemplo
    await Transaccion.create([
      { tipo: 'transferencia', monto: 1000, cuentaOrigen: cta1._id, cuentaDestino: cta3._id, saldoResultanteOrigen: cta1.saldo - 1000, saldoResultanteDestino: cta3.saldo + 1000, descripcion: 'Transferencia entre cuentas' }
    ]);

    console.log(GREEN + '[SEED] Base de datos poblada correctamente' + RESET);
    console.log(GREEN + '[SEED] Cuentas creadas:' + RESET);
    cuentas.forEach((c) => console.log(GREEN + '  - ' + c.numeroCuenta + ' | ' + c.titular + ' | $' + c.saldo + ' | ID: ' + c._id + RESET));

    process.exit(0);
  } catch (error) {
    console.error(GREEN + '[SEED] Error:' + RESET, error.message);
    process.exit(1);
  }
};

seed();