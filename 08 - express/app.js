const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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

// blog routes you can use the middleware and scope it to the blogs only
app.use("/blogs", blogRoutes);

// 404 page

// it fires for anything that doesn't reach a match in the code above, so we need
// to keep this at the bottom
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
