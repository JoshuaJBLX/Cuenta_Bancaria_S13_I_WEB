import mongoose from 'mongoose';

const cuentaSchema = new mongoose.Schema(
  {
    numeroCuenta: { type: String, required: true, unique: true, trim: true },
    titular: { type: String, required: true, trim: true },
    saldo: { type: Number, required: true, default: 0, min: 0 },
    moneda: { type: String, default: 'USD', trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Cuenta', cuentaSchema);