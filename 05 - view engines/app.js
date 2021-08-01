const express = require('express')

// express app
const app = express()

// register view engine 
app.set('view engine', 'ejs')

// listen for requests
app.listen(3000)

// requests

app.get('/', (req, res) => {
  // handles our requests and the response codes for us
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem impsum'},
    {title: 'Luigi finds mario', snippet: 'Lorem impsum'},
    {title: 'Bowser finds peach', snippet: 'Lorem impsum'},
  ]
  res.render('index', { title: 'Home', blogs })
})


app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('./about')
})


app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' })
})

// 404 page

// it fires for anything that doesn't reach a match in the code above, so we need 
// to keep this at the bottom
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
