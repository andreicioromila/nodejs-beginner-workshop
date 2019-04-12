const express = require('express')
const router = express.Router()

const Todo = require('../models/todo')

const passport = require('passport')

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo
    .createForUserId(req.user._id, req.body.title)
    .then(todo => {
      res.json(todo)
    })
    .catch(err => {
      res.json({ success: false, message: err })
    })
})

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const todos = await Todo.getAllByUserId(req.user._id)

  return res.json(todos)
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo
    .getByIdAndUserId(req.params.id, req.user._id)
    .then(todo => {
      // todo will be null if not found
      res.json(todo)
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo
    .deleteByIdAndUserId(req.params.id, req.user._id)
    .then(todo => {
      res.json(todo)
    })
    .catch(err => {
      console.log(err)
    })
})

router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo
    .updateByIdAndUserId(req.params.id, req.user._id, req.body.title)
    .then(todo => {
      res.json(todo)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
