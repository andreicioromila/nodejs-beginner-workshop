const express = require('express')

let app = express()

let id = 0
const jokes = [{ id, joke: 'A horseman had a horse and the horse had nothing against it', punchLine: '' }]

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url} ${new Date().toString()}`)
  next()
})

const findJokeIndex = (id) => {
  id = parseInt(id)

  return jokes.findIndex(joke => joke.id === id)
}

app.use(express.static(`${__dirname}/public`))

app.get('/jokes/:id', (req, res) => {
  const index = findJokeIndex(req.params.id)

  if (!index) {
    res.status(404).end()
  }

  res.json(jokes[index])
})

app.get('/jokes', (req, res) => {
  res.json(jokes)
})

app.post('/jokes', (req, res) => {
  let joke = { id, joke: req.body.joke, punchLine: req.body.punchLine ? req.body.punchLine : '' }
  jokes.push(joke)
  res.json(joke)
})

app.delete('/jokes/:id', (req, res) => {
  const index = findJokeIndex(req.params.id)

  if (!index) {
    res.status(404).end()
  }

  jokes.splice(index, 1)
  res.status(200)
  res.end()
})

app.put('/jokes/:id', (req, res) => {
  const index = findJokeIndex(req.params.id)

  if (!index) {
    res.status(404).end()
  }

  let joke = { id: req.params.id, joke: req.body.joke, punchLine: req.body.punchLine ? req.body.punchLine : '' }
  jokes[index] = joke
  res.json(joke)
})

app.patch('/jokes/:id', (req, res) => {
  const index = findJokeIndex(req.params.id)

  if (!index) {
    res.status(404).end()
  }

  let joke = {
    id: req.params.id,
    joke: req.body.joke ? req.body.joke : jokes[i].joke,
    punchLine: req.body.punchLine ? req.body.punchLine : jokes[i].punchLine
  }
  jokes[index] = joke
  res.json(joke)
})

app.listen(8080, () => {
  console.log('start')
})
