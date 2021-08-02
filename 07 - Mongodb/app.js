const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");

// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://admin:test123@cluster0.7kl4y.mongodb.net/nodetuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // parse the data and then trigger the server when connected
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files place files in the public folder and you can
// access it
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   });

//   blog.save()
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

// app.get('/all-blogs', (req, res) =>{
//   Blog.find()
//   .then((result => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   }))
// })

// app.get('/single-blog', (req, res) =>{
//   Blog.findById('610720f759fce53797ea3b8c')
//   .then((result => {
//     res.send(result)
//   }))
// })

// requests
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("./about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// blog routes
app.get("/blogs", (req, res) => {
  // sort by timestamp
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
  .then(result => {
    res.redirect('/blogs')
  })
  .catch((err) => {
    console.log(err)
  })
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then(result => {
      res.render('details', {blog: result, title: 'Blog Details'})
    })
    .catch(err => {
      console.log(err)
    })
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect: '/blogs' })
  })
  .catch(err => {
    console.log(err)
  })
})

// 404 page

// it fires for anything that doesn't reach a match in the code above, so we need
// to keep this at the bottom
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
