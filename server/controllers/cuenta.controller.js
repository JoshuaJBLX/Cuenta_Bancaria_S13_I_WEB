import mongoose from 'mongoose';
import Cuenta from '../models/Cuenta.js';
import Transaccion from '../models/Transaccion.js';

const validarMonto = (monto) => {
  return typeof monto === 'number' && Number.isFinite(monto) && monto > 0;
};

export const listarCuentas = async (req, res) => {
  try {
    const cuentas = await Cuenta.find().select('numeroCuenta titular saldo moneda');
    res.json({ success: true, data: cuentas, message: 'Cuentas obtenidas correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const obtenerCuenta = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'ID de cuenta inválido' });
    }
    const cuenta = await Cuenta.findById(id);
    if (!cuenta) {
      return res.status(404).json({ success: false, error: 'Cuenta no encontrada' });
    }
    res.json({ success: true, data: cuenta, message: 'Cuenta obtenida correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const depositar = async (req, res) => {
  try {
    const { cuentaId, monto } = req.body;
    if (!mongoose.Types.ObjectId.isValid(cuentaId)) {
      return res.status(400).json({ success: false, error: 'ID de cuenta inválido' });
    }
    if (!validarMonto(monto)) {
      return res.status(400).json({ success: false, error: 'Monto inválido: debe ser un número mayor que 0' });
    }
    const cuenta = await Cuenta.findById(cuentaId);
    if (!cuenta) {
      return res.status(404).json({ success: false, error: 'Cuenta no encontrada' });
    }
    cuenta.saldo += monto;
    await cuenta.save();
    await Transaccion.create({
      tipo: 'deposito',
      monto,
      cuentaOrigen: cuentaId,
      saldoResultanteOrigen: cuenta.saldo,
      descripcion: 'Depósito de ' + monto
    });
    res.json({ success: true, data: cuenta, message: 'Depósito realizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const retirar = async (req, res) => {
  try {
    const { cuentaId, monto } = req.body;
    if (!mongoose.Types.ObjectId.isValid(cuentaId)) {
      return res.status(400).json({ success: false, error: 'ID de cuenta inválido' });
    }
    if (!validarMonto(monto)) {
      return res.status(400).json({ success: false, error: 'Monto inválido: debe ser un número mayor que 0' });
    }
    const cuenta = await Cuenta.findById(cuentaId);
    if (!cuenta) {
      return res.status(404).json({ success: false, error: 'Cuenta no encontrada' });
    }
    if (monto > cuenta.saldo) {
      return res.status(400).json({ success: false, error: 'Saldo insuficiente' });
    }
    cuenta.saldo -= monto;
    await cuenta.save();
    await Transaccion.create({
      tipo: 'retiro',
      monto,
      cuentaOrigen: cuentaId,
      saldoResultanteOrigen: cuenta.saldo,
      descripcion: 'Retiro de ' + monto
    });
    res.json({ success: true, data: cuenta, message: 'Retiro realizado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const transferir = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { cuentaOrigenId, cuentaDestinoId, monto } = req.body;
    if (!mongoose.Types.ObjectId.isValid(cuentaOrigenId) || !mongoose.Types.ObjectId.isValid(cuentaDestinoId)) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, error: 'ID de cuenta inválido' });
    }
    if (!validarMonto(monto)) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, error: 'Monto inválido: debe ser un número mayor que 0' });
    }
    if (cuentaOrigenId === cuentaDestinoId) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, error: 'La cuenta origen y destino deben ser diferentes' });
    }
    const cuentaOrigen = await Cuenta.findById(cuentaOrigenId).session(session);
    const cuentaDestino = await Cuenta.findById(cuentaDestinoId).session(session);
    if (!cuentaOrigen || !cuentaDestino) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, error: 'Una de las cuentas no fue encontrada' });
    }
    if (monto > cuentaOrigen.saldo) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, error: 'Saldo insuficiente en la cuenta origen' });
    }
    cuentaOrigen.saldo -= monto;
    cuentaDestino.saldo += monto;
    await cuentaOrigen.save({ session });
    await cuentaDestino.save({ session });
    await Transaccion.create([{
      tipo: 'transferencia',
      monto,
      cuentaOrigen: cuentaOrigenId,
      cuentaDestino: cuentaDestinoId,
      saldoResultanteOrigen: cuentaOrigen.saldo,
      saldoResultanteDestino: cuentaDestino.saldo,
      descripcion: 'Transferencia de ' + monto + ' a cuenta ' + cuentaDestino.numeroCuenta
    }], { session });
    await session.commitTransaction();
    res.json({ success: true, data: { cuentaOrigen, cuentaDestino }, message: 'Transferencia realizada correctamente' });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

export const obtenerHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'ID de cuenta inválido' });
    }
    const transacciones = await Transaccion.find({
      $or: [{ cuentaOrigen: id }, { cuentaDestino: id }]
    }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: transacciones, message: 'Historial obtenido correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};