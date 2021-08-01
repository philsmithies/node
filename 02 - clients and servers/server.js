const http = require('http')
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  // three sets for the content you can say text plain or html
  res.setHeader('Content-Type', 'text/html')

  // our roots that use switch statement to change where we are headed
  let path = './views/';
  switch(req.url) {
    case '/': 
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about': 
      path += 'about.html'
      // giving different status codes for each page
      res.statusCode = 201;
      break
    case '/about-me': 
      path += 'about.html'
      // redirect status code
      res.statusCode = 301;
      res.setHeader('location', '/about')
      res.end()
      break
    default:
      path += '404.html'
      res.statusCode = 404;
      break
  }



  // add content to our page
  // sampling adding our own header as the browser will add it in by default

  // res.write('<head><link rel="stylesheet" href="#"></head>')
  // res.write('<h1>hello world</h1>')
  // res.write('<h1>hello again</h1>')
  // res.end()

  // send html file 
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    } else {
      // you can remove this line and put data in res.end
      // res.write(data)
      res.end(data)
    }
  })
});

server.listen(3000, 'localhost', () => {
  console.log('Listening for requests on port 3000')
})