const http = require('http')
const url = require('url')
const fs = require('fs')
let id=0
const jokes = [{id,joke:'A horseman had a horse and the horse had nothing against it',punchLine:''}]

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
        id+=1
        jokes.push({id,joke:joke.joke,punchLine:joke.punchLine?joke.punchLine:''})// use ...joke
        res.write(JSON.stringify(jokes))
        res.end()
      })
    }
  }else {
    let newPath=path.split('/')
    let reqId=parseInt(newPath[2])
    let i
    let id=-99
    for(i=0;i<jokes.length;i++){
      if(jokes[i].id===reqId){
        id=i
        break
      }
    }
    if(id<0){
      res.writeHead(404)
      res.end()
    }
    if(newPath[1]==='jokes'){
      if(req.method==='GET'){
        res.write(JSON.stringify(jokes[i]))
        res.end()
      } else if(req.method==='DELETE'){
              jokes.splice(i, 1)
              res.writeHead(200)
              res.end()
        }else if(req.method==='PUT'){
              let putBody = ''
              req.on('data', data => {
                putBody += data
              })
              req.on('end', () => {
                let joke = JSON.parse(putBody)
                jokes[i]={id:reqId,joke:joke.joke,punchLine:joke.punchLine?joke.punchLine:''}
                res.write(JSON.stringify(jokes))
                res.end()
              })
        }else if(req.method==='PATCH'){
              let putBody = ''
              req.on('data', data => {
                putBody += data
              })
              req.on('end', () => {
                let joke = JSON.parse(putBody)
                jokes[i]={id:req.id,joke:joke.joke?joke.joke:jokes[i].joke,punchLine:joke.punchLine?joke.punchLine:jokes[i].punchLine}
                res.write(JSON.stringify(jokes))
                res.end()
              })
        }
    }
  }
}).listen(8080, () => {
  console.log('Server listening on port 8080')
})
