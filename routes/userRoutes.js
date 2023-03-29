const router = require('express').Router();
const Author = require('../models/Author');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');



// const querystring = require('querystring');

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
    console.log('Yo yo')
    // console.log('From /login POST, req.fields.email is: ' + req.fields.email)

    console.table(req.body)

    // const formData = querystring.parse(body);
    console.log('req.body.email: ', req.body.email)
    console.log('req.body.password: ', req.body.password)


    const authorData = await Author.findOne({
      // where: { email: req.fields.email },
      where: { email: req.body.email },
    });
    console.log('authorData from DB: ' + authorData)
    console.log('authorData from DB: ' + JSON.stringify(authorData))
    if (!authorData) {
      res.status(400).json({
        message: `No such user found. Please check your email address and try again. If you have not registered with that email yet, please <a href="/signup">sign up</a>.`,
      });
      return;
    }

    // const validPassword = await authorData.checkPassword(req.fields.password);

    const validPassword = await authorData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: `Incorrect password . Please try again.`,
      });
      return;
    }

    req.session.authorId = authorData.id;
    req.session.username = authorData.username;
    req.session.loggedIn = true;

    // const message = 'You are now logged in!';

      req.session.save(() => {
        console.log('FROM POST /login loggedIn:', req.session.loggedIn);
        res
        .status(200)
        .send();
      });


     
      

    // res.redirect('/');

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.render('login', { session: req.session });
      
    }
  });
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    // res.redirect('/');
    res.redirect(req.headers.referer || '/');
    // This code will redirect the user to the previous URL if available, or to the homepage ('/') if the Referer header is not set.
  }
  try {
    res.render('login', { session: req.session });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to display the signup form
router.get('/signup', async (req, res) => {
  res.render('signup', { session: req.session });
});

router.post('/signup', async (req, res) => {
  try {
    // console.log('req.body: ', req.body);
    // const { username, email, password, confirm_password } = req.body;

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;

    console.log(username, email, password, confirmPassword)

    if ( req.body.password !== req.body.confirm_password) {
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
        existingAuthor.username === username ? 'Username is already taken.' : 'Email is already registered.';

      res.status(400).json({ message });
      return;
    }

    // Hash password
    console.log('look password: ', password);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new author
    const newAuthor = await Author.create({
      username,
      email,
      password: hashedPassword,
    });

    // // Create new session and set req.session.loggedIn to true upon successful sign up
    // req.session.save(() => {
    //   req.session.authorId = newAuthor.id;
    //   req.session.username = newAuthor.username;
    //   req.session.loggedIn = true;
    //   // res.json(newAuthor);
    //   console.log('FROM POST /signup loggedIn:', req.session.loggedIn);
    // });

   // Set req.session variables
   req.session.authorId = newAuthor.id;
   req.session.username = newAuthor.username;
   req.session.loggedIn = true;

   // Save session
   req.session.save(() => {
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

    res.render('signup', { session : req.session });


  } catch (error) {
    res.status(400).json(error);
  }
});






// define a test route that returns the value of req.session.loggedIn
router.get('/test', (req, res) => {
  res.send(`Logged in: ${req.session.loggedIn}`);
});



router.post('post/:id/new-comment', async (req, res) => {

})



module.exports = router;

