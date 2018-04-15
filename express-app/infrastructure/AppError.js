class AppError extends Error {
  constructor (err, displayMessage, httpCode) {
    super()
    this.name = 'AppError'
    this.displayMessage = displayMessage
    this.httpCode = httpCode
    this.stack = err.stack
  }
}

module.exports = AppError
