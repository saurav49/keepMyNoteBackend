const sendError = (res, message, statusCode = 500) => {

  return res.status(statusCode).json({
    success: false,
    message: message,
  })
};

module.exports = { sendError }