const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let posts = []; // Array to store posts

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home route - display all posts
app.get('/', (req, res) => {
  res.render('home', { posts: posts });
});

// Create route - show form to create a new post
app.get('/create', (req, res) => {
  res.render('create');
});

// Handle post creation
app.post('/create', (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost); // Add new post to the array
  res.redirect('/');
});

// View individual post
app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts[postId];
  res.render('post', { post: post, id: postId });
});

// Edit post route - show form to edit the post
app.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts[postId];
  res.render('edit', { post: post, id: postId });
});

// Handle post update
app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  posts[postId] = {
    title: req.body.title,
    content: req.body.content
  };
  res.redirect('/post/' + postId);
});

// Delete post route
app.post('/delete/:id', (req, res) => {
  const postId = req.params.id;
  posts.splice(postId, 1); // Remove post 
  res.redirect('/');
});

// Start the server(use node app.js)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
