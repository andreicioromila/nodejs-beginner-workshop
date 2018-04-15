module.exports.errorHandling = (err, req, res, next) => {
  console.log(err)
  if (err) {
    return res.status(err.httpCode || 503).send({message: err.displayMessage})
  }
  next()
}
