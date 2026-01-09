  class ErrorHandeler extends Error {
  constructor (message, statusCode) {
    super (message);
    this.statusCode = statusCode;
  }
}
export const errorMiddleWare = (err,req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';
  switch (err.name) {
    case 'CastError': {
      const message = `Invalid ${err.path}`;
      err = new ErrorHandeler (message, 401);
      break;
    }
    case 'JsonWebTokenError': {
      const message = "Invalid authentication token. Please log in again.";
      err = new ErrorHandeler (message, 503);
      break;
    }
    case 'TokenExpiredError': {
      const message = "Your session has expired. Please log in again."
      err = new ErrorHandeler (message, 402);
      break;
    }
  }
  return res.status(err.statusCode).json ({
    success: false,
    message: err.message,
  });
};
export {ErrorHandeler}