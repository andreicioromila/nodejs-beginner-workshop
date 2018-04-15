let User = require('../models/user');
let bcrypt = require('bcrypt')

function register (email, password) {
  return generatePasswordHash(password)
    .then(encryptedPassword => {
      return User.createUser(email, encryptedPassword)
    })
    .then(user => {
      // send welcome email
      return user
    })

  function generatePasswordHash(password) {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
  }
}

function login (email, password) {
  return User.login(email, password)
}

module.exports = {
  register,
  login
}