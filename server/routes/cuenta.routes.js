import express from 'express';
import {
  listarCuentas,
  obtenerCuenta,
  depositar,
  retirar,
  transferir,
  obtenerHistorial
} from '../controllers/cuenta.controller.js';

const router = express.Router();

router.get('/', listarCuentas);
router.get('/:id', obtenerCuenta);
router.post('/deposito', depositar);
router.post('/retiro', retirar);
router.post('/transferencia', transferir);
router.get('/:id/historial', obtenerHistorial);

export default router;