import mongoose from 'mongoose';

const transaccionSchema = new mongoose.Schema(
  {
    tipo: { type: String, enum: ['deposito', 'retiro', 'transferencia'], required: true },
    monto: { type: Number, required: true, min: 0 },
    cuentaOrigen: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' },
    cuentaDestino: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuenta' },
    saldoResultanteOrigen: { type: Number },
    saldoResultanteDestino: { type: Number },
    descripcion: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Transaccion', transaccionSchema);