const errorHandler = (err, req, res, next) => {

  console.err(err.stack);

  const statusCode = err.statuscode || 500;

  res.status(statusCode).json({
    success: false,
    message: 'Error has occured, see errorMessage Key for more details',
    errorMessage: err.message,
  })

}

module.exports = { errorHandler };