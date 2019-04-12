const router = require('express').Router()
const passport = require('passport')

let usersUseCases = require('../domain/usersUseCases')

router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.user)
  res.send('successfully authenticated')
})

router.post('/register', (req, res, next) => {
  usersUseCases
    .register(req.body.email, req.body.password)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      next(new AppError(err, 'User could not be created', 409))
    })
})

router.post('/login', (req, res, next) => {
  usersUseCases
    .login(req.body.email, req.body.password)
    .then(jwt => {
      res.json({ success: true, token: jwt })
    })
    .catch(err => {
      next(new AppError(err, 'User could not be authenticated', 401))
    })
})

module.exports = router
