const http = require('http');
const url = require('url')
let todos = [],
  currentId = 1;

http.createServer((req, res) => {
  let path = url.parse(req.url).path

  if (path === '/todos') {
    if(req.method === 'GET') {
      res.write(JSON.stringify(todos));
      res.end();
    } else if(req.method === 'POST') {
      let postBody = '';
      req.on('data', (data) => {
        postBody += data;
      });
      req.on('end', () => {
        let newTodo = JSON.parse(postBody);
        newTodo.id = currentId;
        todos.push(newTodo);
        res.write(currentId.toString());
        currentId++;
        res.end();
      });
    }
    console.log('TODO RESOURCE');
    // should check with a regex
    if(req.method === 'DELETE') {
      let id = parseInt(req.url.split('/')[2]);
      let foundTodo = todos.find(current => current.id === id);
      console.log(foundTodo);
      if(foundTodo) {
        todos.splice(todos.indexOf(foundTodo), 1);
      } else {
        res.writeHead(404);
      }
      res.end();
    }
  }
}).listen(1339);
