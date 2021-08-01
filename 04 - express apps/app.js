const express = require('express')

// express app
const app = express()

// listen for requests
app.listen(3000)

// requests

app.get('/', (req, res) => {
  // handles our requests and the response codes for us
  res.sendFile('./views/index.html', { root: __dirname});
})


app.get('/about', (req, res) => {
  // handles our requests and the response codes for us
  // with an options parameter for finding the file we are linking
  res.sendFile('./views/about.html', { root: __dirname});
})

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('./about')
})

// 404 page

// it fires for anything that doesn't reach a match in the code above, so we need 
// to keep this at the bottom
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname});
})
