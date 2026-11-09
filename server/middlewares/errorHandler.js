const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Error interno del servidor';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ID inválido';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Datos de validación inválidos';
  }

  res.status(statusCode).json({
    success: false,
    error: message
  });
};

export default errorHandler;