const http = require('http');
const fs = require('fs');
const url = require('url')

const readHtml = path => new Promise((resolve, reject) => {
  fs.readFile('./public' + path + '/index.html', (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data)
    }
  });
});

http.createServer((req, res) => {

  const q = url.parse(req.url, true);
  const fileName = q.pathname;

  switch (fileName) {

    case '/login':
      readHtml(fileName).then(data => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
      break

    case '/register':
      readHtml(fileName).then(data => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
      break

    case '/card-profile':

      readHtml(fileName).then(data => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
      break

    case '/profile':
      readHtml(fileName).then(data => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
      break

    case '/notes':
      readHtml(fileName).then(data => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
      break

    default:
      let textType = fileName.split('.');
      textType = textType[1];
      fs.readFile('./public' + fileName, (error, data) => {
        if (error) {
          console.log(error);
          res.writeHead(500);
          return res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'text/' + textType });
          res.write(data);
          return res.end();
        }
      });
  };

}).listen(8080);

