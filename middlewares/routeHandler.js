const routeHandler = (req, res, next) => {

  res.status(400).json({
    success: false,
    message: 'The Route that you are looking for could not be found'
  })

}

module.exports = { routeHandler };