const router = require('express').Router();
const Author = require('../models/Author');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// // Middleware to check if user is authenticated
// router.use((req, res, next) => {
//   if (req.session.loggedIn || req.path === '/login' || req.path === '/signup') {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const authorData = await Author.findOne({
      where: { email: req.body.email },
      // raw: true
    });
    console.log('authorData from DB: ' + JSON.stringify(authorData))
    if (!authorData) {
      res.status(400).json({
        message: `Incorrect email or password email: ${req.body.email}, please click back on your browser and try again.`,
      });
      return;
    }

    const validPassword = await authorData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: `Incorrect email or password email: ${req.body.email}, please click back on your browser and try again.`,
      });
      return;
    }

      req.session.save(() => {
        req.session.authorId = authorData.id;
        req.session.username = authorData.username;
        req.session.loggedIn = true;
        console.log('FROM POST /login loggedIn:', req.session.loggedIn);
        res
          .status(200)
          .json({ authorData, message: 'You are now logged in!' }).redirect('/');
      });


     
      

    // res.redirect('/');

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    // res.redirect('/');
    res.redirect(req.headers.referer || '/');
    // This code will redirect the user to the previous URL if available, or to the homepage ('/') if the Referer header is not set.
  }
  try {
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to display the signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  try {
    console.log('req.body' + JSON.stringify(req.body));
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if username or email already exists
    const existingAuthor = await Author.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingAuthor) {
      const message =
        existingAuthor.username === username ? 'Username is already taken' : 'Email is already registered';

      res.status(400).json({ message });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // Create new author
    const newAuthor = await Author.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create new session and set req.session.loggedIn to true upon successful sign up
    req.session.save(() => {
      req.session.authorId = newAuthor.id;
      req.session.username = newAuthor.username;
      req.session.loggedIn = true;
      res.json(newAuthor);
      console.log('FROM POST /signup loggedIn:', req.session.loggedIn);
    });

    // Return success response
    // res.status(201).json({
    //   message: 'Successfully signed up',
    //   data: {
    //     id: newAuthor.id,
    //     username: newAuthor.username,
    //     email: newAuthor.email,
    //   },
    // });

    //res.status(201).redirect('/')


  } catch (error) {
    res.status(400).json(error);
  }
});






// define a test route that returns the value of req.session.loggedIn
router.get('/test', (req, res) => {
  res.send(`Logged in: ${req.session.loggedIn}`);
});




module.exports = router;

