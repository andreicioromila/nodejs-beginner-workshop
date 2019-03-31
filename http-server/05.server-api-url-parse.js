const http = require('http')
const url = require('url')
const fs = require('fs')
const jokes = ['A horseman had a horse and the horse had nothing against it']

http.createServer((req, res) => {
  let path = url.parse(req.url).path

  if (path === '/') {
    return fs.createReadStream('index.html').pipe(res)
  }

  if (path === '/jokes') {
    if (req.method === 'GET') {

      res.write(JSON.stringify(jokes))
      res.end()
    } else if (req.method === 'POST') {
      let postBody = ''
      req.on('data', data => {
        postBody += data
      })
      req.on('end', () => {
        let joke = JSON.parse(postBody)
        jokes.push(joke)
        res.write(JSON.stringify(jokes))
        res.end()
      })
    } else if (req.method === 'DELETE') {
      let id = parseInt(path.split('/').pop())
      if (id < jokes.length) {
        jokes.splice(id, 1)
        res.writeHead(200)
      } else {
        res.writeHead(404)
      }
      res.end()
    }
  }
}).listen(8080, () => {
  console.log('Server listening on port 8080')
})
