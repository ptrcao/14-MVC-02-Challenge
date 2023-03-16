// const router = require('express').Router();
// const Author = require('../models/Author');


// const { Op } = require('sequelize');
// const bcrypt = require('bcrypt');



// router.post('/login', async (req, res) => {
//   try {
//     const authorData = await Author.findOne({ where: { email: req.body.email } });

//     if (!authorData) {
//       res
//         .status(400)
//         .json({ message: `Incorrect email or password email: ${req.body.email}, please click back on your browser and try again.` });
//       return;
//     }

//     const validPassword = await authorData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: `Incorrect email or password email: ${req.body.email}, please click back on your browser and try again.` });
//       return;
//     }

//     req.session.save(() => {
//       req.session.author_id = authorData.id;
//       req.session.logged_in = true;

//       res.redirect('/');
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });


// router.get('/login', (req, res) => {
//     // If a session exists, redirect the request to the homepage
//     if (req.session.logged_in) {
//       res.redirect('/');
//     }
//     try{
//     res.render('login');
//     }
//     catch(err){
//         console.error(err);
//         res.status(500).json(err);
//     }
//   });


// // Route to display the signup form
// router.get('/signup', (req, res) => {
//   res.render('signup');
// });


//   router.post('/signup', async (req, res) => {
//     try {

//       console.log('req.body' + JSON.stringify(req.body));
//       const { username, email, password, confirm_password } = req.body;

//       if (password !== confirm_password) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//       }

//       // Check if username or email already exists
//       const existingAuthor = await Author.findOne({
//         where: {
//           [Op.or]: [{ username }, { email }],
//         },
//       });
  
//       if (existingAuthor) {
//         const message = existingAuthor.username === username ?
//           'Username is already taken' :
//           'Email is already registered';
  
//         res.status(400).json({ message });
//         return;
//       }
  
//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);
  
//       // Create new author
//       const newAuthor = await Author.create({
//         username,
//         email,
//         password: hashedPassword,
//       });

//       // It is recommended to create a new session and set req.session.logged_in to true upon successful sign up. This way, the user will be considered as logged in and can access any protected routes that require authentication.
//       // You can modify the /signup route to create a new session upon successful sign up by adding the following code after creating a new author:
//       req.session.save(() => {
//         req.session.author_id = newAuthor.id;
//         req.session.logged_in = true;
//       });
//       // This will create a new session and set req.session.author_id to the newly created author's ID and req.session.logged_in to true.
  
//       // Return success response
//       res.status(201).json({
//         message: 'Successfully signed up',
//         data: {
//           id: newAuthor.id,
//           username: newAuthor.username,
//           email: newAuthor.email,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error. Please try again later.' });
//     }
//   });

// module.exports = router;


const router = require('express').Router();
const Author = require('../models/Author');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// // Middleware to check if user is authenticated
// router.use((req, res, next) => {
//   if (req.session.logged_in || req.path === '/login' || req.path === '/signup') {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const authorData = await Author.findOne({ where: { email: req.body.email } });

//     if (!authorData) {
//       res.status(400).json({
//         message: `Incorrect email or password email: ${req.body.email}, please click back on your browser and try again.`,
//       });
//       return;
//     }

//     const validPassword = await authorData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({
//         message: `Incorrect email or password email: ${req.body.email}, please click back on your browser and try again.`,
//       });
//       return;
//     }

//     req.session.save(() => {
//       req.session.author_id = authorData.id;
//       req.session.logged_in = true;

//       res.redirect('/');
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });





router.post('/login', async (req, res) => {
  try {
    const authorData = await Author.findOne({ where: { email: req.body.email } });

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
      req.session.author_id = authorData.id;
      req.session.logged_in = true;
    });
  


    res.redirect('/');

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new author
    const newAuthor = await Author.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create new session and set req.session.logged_in to true upon successful sign up
    req.session.save(() => {
      req.session.author_id = newAuthor.id;
      req.session.logged_in = true;
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

    res.status(201).redirect('/')


  } catch (error) {
    res.status(400).json(error);
  }
});






// define a test route that returns the value of req.session.logged_in
router.get('/test', (req, res) => {
  res.send(`Logged in: ${req.session.logged_in}`);
});




module.exports = router;

