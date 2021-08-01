const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://admin:test123@cluster0.7kl4y.mongodb.net/nodetuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// parse the data and then trigger the server when connected
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

// register view engine 
app.set('view engine', 'ejs')

// middleware and static files place files in the public folder and you can 
// access it
app.use(express.static('public'))
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })
})




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
