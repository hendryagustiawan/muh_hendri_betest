const errorHandler = (err, req, res, next) => {
  let statusCode;
  let errMessage;

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;

      errMessage = err.errors.map((el) => {
        // jika ada data kosong
        return el.message;
      });
      break;
    case "Username already registered":
      statusCode = 400;

      errMessage = "Username already registered";
      break;
    case "Username and Password is required":
      statusCode = 400;

      errMessage = `Username and Password is required`;
      break;
    case "Username is required":
      statusCode = 400;

      errMessage = `Username is required`;
      break;
    case "Password is required":
      statusCode = 400;

      errMessage = `Password is required`;
      break;
    case "Token Required":
      statusCode = 400;

      errMessage = `does't access because token is required`;
      break;
    case `Can't Add`:
      statusCode = 400;

      errMessage = `does't add because data already in your list favorite`;
      break;
    case "Invalid User":
    case "TypeError":
      statusCode = 401;

      errMessage = `Authenticated Failed`;
      break;
    case "JsonWebTokenError":
      statusCode = 401;

      errMessage = `Invalid Token`;
      break;
    case "Forbidden":
      statusCode = 403;

      errMessage = `Does't Access`;
      break;
    case "Not Found":
      statusCode = 204;

      errMessage = `Data not Found`;
      break;
    default:
      statusCode = 500;
      errMessage = "Internal Server Error";
  }

  res.status(statusCode).json({ message: errMessage });
};

module.exports = errorHandler;
