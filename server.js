const sequelize = require("./config/connection");

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import the Express framework into the current file by requiring the 'express' module
const express = require('express');
// Import the Node.js path module, which provides utilities for working with file and directory paths. It is used to manipulate and interact with file paths in a platform-agnostic way.
const path = require('path')

// Create an instance of the Express application by calling the imported express() function. The app variable will be used to configure the application's behavior and handle HTTP requests
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));
const { Author, Comment, Post } = require("./models");





const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    // helpers: {
    //     lessThan: (value, limit) => {
    //       return value < limit;
    //     },
    //   },
    helpers: {
        slice: function(arr, start, end) {
          return arr.slice(start, end);
        },
        formatDate: function(timestamp){
            const date = new Date(timestamp * 1000);
            return date.toLocaleString();
          }
      }
});

// Define the port number on which the application will listen for incoming requests
const PORT = 3000;

// Adds middleware to the application that serves static files from the public directory. This means that any files in the public directory will be served directly to clients requesting them, without any special routing or logic needed. The express.static middleware function takes one argument, which is the directory from which to serve static assets (in this case, the public directory)
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));


const indexRoutes = require('./routes/indexRoutes')
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
// homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in



// index routes
app.use(indexRoutes)
// post routes
app.use('/post', postRoutes)

app.use(userRoutes)

// app.get('/post-archive', (req, res) => {
// res.render('index', { title: 'Tech Blog Home' });
// });

// WHEN I click on the homepage option, THEN I am taken to the homepage

// WHEN I click on any other links in the navigation, THEN I am prompted to either sign up or sign in

// WHEN I choose to sign up, THEN I am prompted to create a username and password

// WHEN I click on the sign-up button, THEN my user credentials are saved and I am logged into the site

// WHEN I revisit the site at a later time and choose to sign in, THEN I am prompted to enter my username and password

// WHEN I am signed in to the site, THEN I see navigation links for the homepage, the dashboard, and the option to log out

// WHEN I click on the homepage option in the navigation, THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

// WHEN I click on an existing blog post, THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

// WHEN I enter a comment and click on the submit button while signed in, THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

// WHEN I click on the dashboard option in the navigation, THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

// WHEN I click on the button to add a new blog post, THEN I am prompted to enter both a title and contents for my blog post

// WHEN I click on the button to create a new blog post, THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

// WHEN I click on one of my existing posts in the dashboard, THEN I am able to delete or update my post and taken back to an updated dashboard

// WHEN I click on the logout option in the navigation, THEN I am signed out of the site

// WHEN I am idle on the site for more than a set time, THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments

sequelize.sync({force : false }).then(() => {
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});