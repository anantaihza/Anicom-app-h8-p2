function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  switch (err.name) {
    case 'NotFound':
      status = 404;
      message = 'Data not found';
      break;
    case 'Forbidden':
      status = 403;
      message = 'You are not authorized';
      break;
    case 'Unauthorized':
      status = 401;
      message = 'Invalid email/password';
      break;
    // Bad request kirim sama message nya
    case 'BadRequest':
      status = 400;
      break;
    case 'Unauthenticated':
    case 'JsonWebTokenError':
      status = 401;
      message = 'Invalid token';
      break;
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      status = 400;
      message = err.errors.map((el) => el.message);
      break;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
